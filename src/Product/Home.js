import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { User } from "./User";
import '../App.css'

export default function Home() {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState([]);
    const [filtered, setFiltered] = useState(users);
    const [selectedCategory, setSelectedCategory] = useState();
    const [sorti, setSorti] = useState("ASC")

    useEffect(() => {
        loadUser();
    }, [])


    const loadUser = async () => {
        await axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setUsers(response.data);
                setFiltered(response.data)
            })
    }


    const onEdit = async (id, price, title, description, category) => {
        await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                price: price,
                title: title,
                description: description,
                category: category,
            }),
            headers: {
                "Content-type": "application/json;"
            }
        })
            .then((response) => {
                if (response.status !== 200) {
                    return;
                } else {
                    return response.json();
                }
            })
            .then(() => {
                const updatedUsers = users.map((user) => {
                    if (user.id === id) {
                        user.id = id;
                        user.price = price;
                        user.title = title;
                        user.description = description;
                        user.category = category;
                    }
                    return user;
                });

                setUsers((users) => updatedUsers);
            })
            .catch((error) => console.log(error));
    };

    const onDelete = async (id) => {
        await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (response.status !== 200) {
                    return;
                } else {
                    setUsers(
                        users.filter((user) => {
                            return user.id !== id;
                        })
                    );
                }
            })
            .catch((error) => console.log(error));
    };

    const handleSearch = (e) => {
        const getSearch = e.target.value;
        // setQuery(getSearch);
        // console.log(getSearch)
        if (getSearch.length > 0) {
            const searchData = users.filter((item) => item.title.toLowerCase().includes(getSearch));
            setUsers(searchData);
        } else {
            setUsers(filtered);
        }
        setQuery(getSearch);
    }

    // const filteredREsult = (prod) => {
    //     const result = users.filter((curr) => {
    //         return curr.category === prod;
    //     });
    //     setUsers(result)
    // }

    var filteredList = useMemo(getFilteredList, [selectedCategory, users]);
    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }
    function getFilteredList() {
        if (!selectedCategory) {
            return users;
        }
        return users.filter((item) => item.category === selectedCategory);
    }

    const sortings = (col) => {
        if (sorti === "ASC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            )
            setUsers(sorted);
            setSorti("DSC")
        }
        if (sorti === "DSC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            )
            setUsers(sorted);
            setSorti("ASC")
        }
    }

    const handleReset = () => {
        loadUser()
        setQuery("")
        setSelectedCategory("")
    }

    return (
        <div className="App">
            <div style={{float:"right", padding:"10px"}}>
              <button className="btn btn-info"  onClick={handleReset}>Reset</button></div>
            <h1>Product List</h1>
            <div className="form-group">
                <input placeholder="Search anything ....."
                    style={{ height: "50px", width: "400px", margin: "auto" }}
                    type="text" className="form-control" id="usr" value={query}
                    onChange={e => handleSearch(e)}
                />
            </div><br />


            <p>Sort by :</p>

            {/* <button value="men's clothing" className="btn btn-success m-4 w-20" onClick={()=>filteredREsult("men's clothing")}>Mens Clothing</button>
            <button value="women's clothing" className="btn btn-danger m-4 w-20" onClick={()=>filteredREsult("women's clothing")}>Womens Clothing</button>
            <button value="electronics" className="btn btn-warning m-4 w-20" onClick={()=>filteredREsult("electronics")} >Electronics</button>
            <button value="jewelery" className='btn btn-danger m-4 w-20' onClick={()=>filteredREsult("jewelery")}  >jewelery</button> */}
            <select
                name="category-list"
                id="category-list"
                onChange={handleCategoryChange}
                class="form-select" aria-label="Default select example"
                style={{ width: "400px" }}
            >

                <option selected value="">All</option>
                <option value="men's clothing">Men's Clothes</option>
                <option value="women's clothing">women's clothing</option>
                <option value="electronics">electronics</option>
                <option value="jewelery">jewelery</option>
            </select><br /><br /><br /><br /><br />
            <table>
                <thead>
                    <tr>
                        <td onClick={() => sortings("id")} style={{ width: "100px", marginRight: "40px", fontWeight: "600" }}>ID</td>
                        <td onClick={() => sortings("title")} style={{ width: "180px", marginRight: "40px", fontWeight: "600" }}>Title</td>
                        <td style={{ width: "100px", marginRight: "10px", fontWeight: "600" }}>Price</td>
                        <td onClick={() => sortings("description")} style={{ width: "600px", marginRight: "10px", fontWeight: "600" }}>Description</td>
                        <td onClick={() => sortings("category")} style={{ width: "100px", marginRight: "10px", fontWeight: "600" }}>Category</td>
                        <td style={{ width: "100px", marginRight: "10px", fontWeight: "600" }}>Image</td>
                    </tr>
                </thead>
            </table>
            {filteredList.map((user) => (
                <User
                    {...user}
                    id={user.id}
                    key={user.id}
                    price={user.price}
                    title={user.title}
                    description={user.description}
                    image={user.image}
                    category={user.category}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}

        </div>
    );
}