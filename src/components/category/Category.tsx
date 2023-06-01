import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getAllCategories } from '../../features/categories/categorySlice';
import { Category } from "../../types";
import { Link } from 'react-router-dom';

const Categories = () => {
    const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

    const categories = useSelector(
        (state: RootState) => state.category.category as Category[]
    );

    const [ category, setCategory ] = useState("");

    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch]);


    return (
    <div>
        <Link to="/">Home</Link>
        {categories && categories.map(c => (
            <div key={c.id}>
                <h2>{c.name}</h2>
            </div>    
        ))}
    </div>
    );
}

export default Categories;