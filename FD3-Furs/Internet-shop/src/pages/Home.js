import React from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../Redux/slices/filterSlice'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import GadgetBlock from '../components/GadgetBlock'
import Skeleton from '../components/Skeleton'
import Pagination from '../components/Pagination'
import { AppContext } from '../App';
import NotFound from './NotFound';


 const Home = () => {
    const dispatch= useDispatch ();
    const categoryId= useSelector ( state => state.filterSlice.categoryId);
    const sortType= useSelector ( state => state.filterSlice.sort);
   
    const {searchValue}= React.useContext(AppContext);

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading]=React.useState(true);
    const [page,setPage]= React.useState(1);
    

    const onClickCategory =React.useCallback((id) => {
      dispatch( setCategoryId (id) );
    },[]);

    React.useEffect ( () => {
        setIsLoading(true);
        const search= searchValue ? `&title=${searchValue}`:"";

        axios.get(`https://643290b3d0127730d2d4f0bd.mockapi.io/items?${search}&page=${page}&limit=8&${ 
                   categoryId > 0 ? `category=${categoryId}` : ''
                   }&sortBy=${sortType.sort}&order=${sortType.dest}`)
              .then( res => {
                setItems(res.data);
                setIsLoading(false);
              });

        window.scrollTo(0,0);
    }, [categoryId, sortType, searchValue, page])

    return(
        <>
        <div className="content__top">
            <Categories categoryId={categoryId} onClickCategory={ onClickCategory }/>
            <Sort/>
        </div>
        <div className="content__items">
        { isLoading
          ? [...new Array(6)].map( (_, index) => <Skeleton key={index}/>)
          : items.map (obj => <GadgetBlock title={obj.title} 
                                          price={obj.price} 
                                          imageUrl={obj.imageUrl}
                                          sizes= {obj.sizes}
                                          types= {obj.types}
                                          key={obj.id}
                                          id={obj.id}
          />)
        }
      </div>
      {items.length===0&& <NotFound/>}
      {items.length>0 && <Pagination onChangePage ={ (number) => setPage(number)}/>}
        </> 
       
    )
}

export default Home;