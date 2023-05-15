import React from 'react';

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/Skeleton'
import Pagination from '../components/Pagination'
import { AppContext } from '../App';

 const Home = () => {

    const {searchValue}= React.useContext(AppContext);

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading]=React.useState(true);
    const [categoryId,setCategoryId]= React.useState(0);
    const [page,setPage]= React.useState(1);
    const [sortType, setSortType]= React.useState( {name: "популярности", sort: "rating"});

    React.useEffect ( () => {
        setIsLoading(true);
        const search= searchValue ? `&title=${searchValue}`:"";

        fetch(`https://643290b3d0127730d2d4f0bd.mockapi.io/items?${search}&page=${page}&limit=4&${ 
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType.sort}&order=${sortType.dest}`)
        .then ( (res) => {
        return res.json();
        })
        .then ( (arr) => {
        setItems(arr);
        setIsLoading(false);
        });
        window.scrollTo(0,0);
    }, [categoryId, sortType, searchValue, page])
    
    return(
        <>
        <div className="content__top">
            <Categories categoryId={categoryId} onClickCategory={ (id) => setCategoryId (id) }/>
            <Sort sortType={sortType} onChangeSort={ (id) => setSortType (id) }/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
        { isLoading
          ? [...new Array(6)].map( (_, index) => <Skeleton key={index}/>)
          : items.map (obj => <PizzaBlock title={obj.title} 
                                          price={obj.price} 
                                          imageUrl={obj.imageUrl}
                                          sizes= {obj.sizes}
                                          types= {obj.types}
                                          key={obj.id}
          />)
        }
      </div>
      <Pagination onChangePage ={ (number) => setPage(number)}/>
        </>
       
    )
}

export default Home;