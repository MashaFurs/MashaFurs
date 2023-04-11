import React from 'react';

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/Skeleton'
import Pagination from '../components/Pagination'

 const Home = (props) => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading]=React.useState(true);
    const [categoryId,setCategoryId]= React.useState(0);
    const [page,setPage]= React.useState(1);
    const [sortType, setSortType]= React.useState( {name: "популярности", sort: "rating"});

    React.useEffect ( () => {
        setIsLoading(true);
        const search= props.searchValue ? `&title=${props.searchValue}`:"";

        fetch(`https://643290b3d0127730d2d4f0bd.mockapi.io/items?page=${page}&limit=4&${ 
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType.sort}&order=${sortType.dest}${search}`)
        .then ( (res) => {
        return res.json();
        })
        .then ( (arr) => {
        setItems(arr);
        setIsLoading(false);
        });
        window.scrollTo(0,0);
    }, [categoryId, sortType, props.searchValue, page])
    
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