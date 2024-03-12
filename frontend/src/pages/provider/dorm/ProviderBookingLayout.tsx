import { useEffect, useState } from "react";
import {
  RoomType,
  RoomTypeProvider,
  RoomTypeProviderSchema,
  dormSchema,
} from "../../../lib/type/Dorm";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "../../etc/NotFoundPage";
import LoadingPage from "../../etc/LoadingPage";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { BookingProviderType, BookingsSchema } from "../../../lib/type/Booking";
import ProviderBookCard from "../../../components/Provider/ProviderBookCard";

export default function ProviderBookingLayout() {
  const { id, roomId } = useParams();
  const [rooms, setRooms] = useState<RoomTypeProvider | null>(null);
  const [isNotFound, setNotFound] = useState<boolean>(false);
  console.log(roomId);
  const [selectRoom, setSelectRoom] = useState<string>(roomId ? roomId : "");
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState<BookingProviderType[] | null>(
    null
  );

  const handleChange = async (event: SelectChangeEvent) => {
    const selectRoom = event.target.value as string;
    setSelectRoom(selectRoom);
    navigate(selectRoom);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/dorms/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!result.ok) {
        // TODO : use 🍞 toast to notify
        setNotFound(true);
        return;
        //return navigate("/");
      } else {
        const tmp = await result.json();
        const data = dormSchema.safeParse(tmp);
        if (!data.success) {
          console.log(data.error);
          return;
        }
        const data_room = RoomTypeProviderSchema.safeParse(data.data.roomTypes);
        if (!data_room.success) {
          console.log(data_room.error);
          return;
        }
        setRooms(data_room.data);
      }
    };
    fetchData();
  }, []);
  console.log(selectRoom);
  if (isNotFound) return <NotFoundPage />;
  if (!rooms) return <LoadingPage />;
  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Room</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectRoom}
            label="Selected Room"
            onChange={handleChange}
          >
            {rooms.map((r) => {
              return (
                <MenuItem value={r.id} key={r.id}>
                  {r.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Outlet />
      {/* {bookingData &&
        bookingData.map((book) => {
          return <ProviderBookCard key={book.id} data={book} />;
        })} */}
    </div>
  );
}
