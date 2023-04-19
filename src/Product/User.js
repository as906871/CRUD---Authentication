import { Input } from "@material-ui/core";
import React, { useState } from "react";
import '../App.css'

export const User = ({ title, price, id, description, image, category, onEdit, onDelete }) => {
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit(!isEdit);
    };

    const handleDelete = () => {
        onDelete(id);
    };

    const handleOnEditSubmit = (evt) => {
        evt.preventDefault();
        onEdit(id, evt.target.price.value, evt.target.title.value, evt.target.description.value, evt.target.category.value);
        setIsEdit(!isEdit);
    };

    return (
        <div>
            {isEdit ? (
                <div>
                    <form onSubmit={handleOnEditSubmit}>
                        <Input disabled className='m-8' style={{ width: "100px" }} placeholder="title" name="id" defaultValue={id} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Input className='m-8' style={{ width: "400px" }} placeholder="title" name="title" defaultValue={title} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Input className='m-8' placeholder="price" name="price" defaultValue={price} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Input className='m-8 ' style={{ width: "500px" }} placeholder="description" name="description" defaultValue={description} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Input disabled className='m-8' placeholder="category" name="category" defaultValue={category} />&nbsp;&nbsp;
                        <button className='btn btn-info mr-2' style={{ float: "right", marginRight: "50px" }} onSubmit={handleOnEditSubmit}>Save</button>
                    </form><br /><br />
                </div>
            ) : (
                <div>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th scope="row">{id}</th>
                                <td style={{ width: "200px", marginRight: "10px" }}>{title}</td>
                                <td style={{ width: "100px", marginRight: "10px" }}>{price}</td>
                                <td style={{ width: "600px", marginRight: "10px" }}>{description}</td>
                                <td style={{ width: "100px", marginRight: "10px" }}>{category}</td>
                                <td ><img src={image} style={{ height: "100px" }} alt="any" /></td>
                                {/* <td style={{ width: "100px", marginRight: "10px" }}>{rating.rate}</td> */}
                                <td>
                                    <button className='btn btn-success m-2' style={{ float: "right" }} onClick={handleEdit}>Edit</button>
                                    <button className='btn btn-danger m-2' onClick={handleDelete} style={{ float: "right" }}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};