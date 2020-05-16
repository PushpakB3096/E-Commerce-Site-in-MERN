/* start of ManageCategories.js */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Base from '../core/Base';
import { isAuthenticated } from "../auth/helper";
import { getCategories, deleteCategory  } from '../admin/helper/adminapicall';

export default function ManageCategories() {

    const [categories, setCategories] = useState([]);

    const { user, token } = isAuthenticated();

    const preload = () => {     //gets all the categories before the page load
        getCategories().then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        preload();
    }, []);

    const deleteThisCategory = categoryId => {
        deleteCategory(categoryId, user._id, token).then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                preload();      //fetch the complete list of categories again after deleting one category
            }
        });
    }; 

    return (
        <Base title="Manage Categories" description="Manage all your categories!">
            <h4>Category list</h4>
            <div className="row">
                <div className="col-12">
                    { categories.map((category, index) => {
                        return (
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h3 className="text-white text-left">{ category.name }</h3>
                                </div>
                                <div className="col-4">
                                    <Link
                                    className="btn btn-success"
                                    to={`/admin/category/update/${category._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button     //TODO: add user confirmation before deleting the category
                                    onClick={() => {
                                        deleteThisCategory(category._id);
                                    }}
                                    className="btn btn-danger"
                                    >
                                    Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Base>
    );
};

/* end of ManageCategories.js */