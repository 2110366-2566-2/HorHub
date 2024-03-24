import DormCard from "../../components/Provider/DormCard";
import { Dorm } from "../../lib/type/Dorm";
import { useEffect, useState } from "react";
import SearchDorm from "./SearchDorm";
import useDebounce from "../../lib/hooks/useDebounce";
import { Bounce, toast } from "react-toastify";
import { calculateDistance } from "../../lib/geodistance";

function DormList(){

    const [isFetching, setFetching] = useState<boolean>(true);
    const [isFetchFailed, setFetchFailed] = useState<boolean>(false);
  
    const [dormsData, setDormsData] = useState<Dorm[]>([]);

    const [name, setName] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    // const [dormFacilities, setDormFacilities] = useState<{value: string, label: string}[]>([])
    const [dormFacilities, setDormFacilities] = useState<string[]>([])
    const [minPrice, setMinPrice] = useState<number>(0)
    const [maxPrice, setMaxPrice] = useState<number>(99999999)
    const [sorter, setSorter] = useState<string>("cheapest")

    const [currentLatitude, setCurrentLatitude] = useState<number>(-999)
    const [currentLongitude, setCurrentLongitude] = useState<number>(-999)

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
      } else {
        toast.error('Please allow geolocation to access this', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
      });
      }
    }

    function setPosition(position: any) {
      setCurrentLatitude(position.coords.latitude)
      setCurrentLongitude(position.coords.longitude)
    }
  
    async function getDorm() {
      try {
        setFetching(true);

        let queryURLArray: string[] = []
        let queryURL = ""
        
        if (name) {
          queryURLArray.push("name=" + name)
        }
        if (location) {
          queryURLArray.push("location=" + location)
        }
        if (dormFacilities.length > 0) {
          queryURLArray.push("facilities=" + dormFacilities.join(" "))
          // queryURLArray.push("facilities=" + dormFacilities.map((fac) => fac.value).join(" "))
        }
        queryURLArray.push(`minprice=${minPrice}`)
        if (maxPrice < 99999999) {
          queryURLArray.push(`maxprice=${maxPrice}`)
        }
        queryURLArray.push("sort=" + sorter)

        if (queryURLArray.length > 0) {
          queryURL = "?" + queryURLArray.join("&")
        }
  
        const res = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/dorms" + queryURL,
          {
            method: "GET",
            credentials: "include",
          }
        );
  
        if (!res.ok) {
          setFetchFailed(true);
          setFetching(false);
          return;
        }
  
        const data = await res.json();
        setDormsData(data);
        console.log(data);
        setFetching(false);
      } catch (err) {
        setFetchFailed(true);
        setFetching(false);
      }
    }
  
    useEffect(() => {
      window.document.title = "Dorms List | HorHub"
      getLocation()
      getDorm();
    }, []);

    useEffect(() => {
      if (sorter === "nearest" && (currentLatitude === -999 || currentLongitude === -999)) {
        toast.error('Please allow geolocation to access this feature', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
      });
      }
    }, [sorter])

    useDebounce(() => {
      getDorm()
    }, [name, location, dormFacilities, maxPrice, minPrice], 500)

    return (
      <div className="min-h-[calc(100vh-7rem)]">
        <SearchDorm
          name={name}
          location={location}
          dormFacilities={dormFacilities}
          minPrice={minPrice}
          maxPrice={maxPrice}
          sorter={sorter}
          setName={setName}
          setLocation={setLocation}
          setDormFacilities={setDormFacilities}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          setSorter={setSorter}
        />
        {
              (dormsData.filter((data) => {
                if (minPrice !== 0) {
                  if (data.roomTypes.length === 0) {
                    return false
                  }
                }
                return true
              }).length === 0) && <div className="w-full h-full flex flex-col justify-center items-center py-4 text-base font-bold">
                No dorm found...
                {/* <div className="loader"></div> */}
              </div>
        }
        <ul className="grid max-w-[26rem] sm:max-w-[52.5rem] lg:max-w-7xl w-[100%] mt-[2rem] mb-[4rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto gap-6 lg:gap-y-8 xl:gap-x-8  px-4 sm:px-6 lg:px-8">
            
            {dormsData
            .sort((a: Dorm, b: Dorm) => {
                if (sorter === "cheapest") {
                  const minPriceA = Math.min.apply(null, a.roomTypes.map((value) => value.cost))
                  const minPriceB = Math.min.apply(null, b.roomTypes.map((value) => value.cost))

                  if (minPriceA < minPriceB) return -1
                  if (minPriceA > minPriceB) return 1
                  return 0
                }
                else if (sorter === "mostexpensive") {
                  const maxPriceA = Math.max.apply(null, a.roomTypes.map((value) => value.cost))
                  const maxPriceB = Math.max.apply(null, b.roomTypes.map((value) => value.cost))

                  if (maxPriceA < maxPriceB) return 1
                  if (maxPriceA > maxPriceB) return -1
                  return 0
                }
                else if (sorter === "nearest") {
                  if (currentLatitude === -999 || currentLongitude === -999) {
                    return 0
                  }
                  const distA = calculateDistance(currentLatitude, currentLongitude, a.latitude, a.longitude)
                  const distB = calculateDistance(currentLatitude, currentLongitude, b.latitude, b.longitude)

                  if (distA < distB) return -1
                  if (distA > distB) return 1
                  return 0
                }
                return 0

            })
            .filter((data) => {
              if (minPrice !== 0) {
                if (data.roomTypes.length === 0) {
                  return false
                }
              }
              return true
            })
            .map((data) => {
                return (
                <DormCard
                    key={data.id}
                    id={data.id}
                    title={data.name}
                    image={
                    data.images.length === 0
                        ? "https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/placeholders%2F681px-Placeholder_view_vector.png?alt=media&token=bc0c7178-b94a-4bf0-957b-42a75f708a79"
                        : data.images[0]
                    }
                />
                );
            })}
        </ul>
        </div>
    )
}

export default DormList