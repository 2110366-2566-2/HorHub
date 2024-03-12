import DormCard from "../../components/Provider/DormCard";
import { Dorm } from "../../lib/type/Dorm";
import { useEffect, useState } from "react";
import SearchDorm from "./SearchDorm";

function DormList(){

    const [isFetching, setFetching] = useState<boolean>(true);
    const [isFetchFailed, setFetchFailed] = useState<boolean>(false);
  
    const [dormsData, setDormsData] = useState<Dorm[]>([]);

    const [name, setName] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    const [dormFacilities, setDormFacilities] = useState<string[]>([])
    const [minPrice, setMinPrice] = useState<number>(0)
    const [maxPrice, setMaxPrice] = useState<number>(99999999)
    const [sorter, setSorter] = useState<string>("distance_asc")
  
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
        }
        queryURLArray.push(`minPrice=${minPrice}`)
        if (maxPrice < 99999999) {
          queryURLArray.push(`maxPrice=${maxPrice}`)
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
      getDorm();
    }, []);
    return (
      <div>
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
        <ul className="grid max-w-[26rem] sm:max-w-[52.5rem] mt-[2rem] mb-[4rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-6 lg:gap-y-8 xl:gap-x-8 lg:max-w-7xl px-4 sm:px-6 lg:px-8">
            {dormsData
            .sort((a: Dorm, b: Dorm) => {
                if (a.name < b.name) {
                return -1;
                }
                if (a.name > b.name) {
                return 1;
                }
                return 0;
            })
            .map((data) => {
                return (
                <DormCard
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