import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const FetchData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users")); // Change "projects" to your collection name
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(items);
        const userDoc = querySnapshot.docs.find(doc => doc.data().name === "Sue");
        if (userDoc) {
          await updateDoc(userDoc.ref, { lastAccessed: new Date().toISOString() });
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <h2>Firestore Data</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li> // Change "name" to the field in your collection
        ))}
      </ul>
    </div>
  );
};

export default FetchData;
