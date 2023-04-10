import React from 'react';

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/Skeleton'

 const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading]=React.useState(true);

    React.useEffect ( () => {

        fetch('https://643290b3d0127730d2d4f0bd.mockapi.io/items')
        .then ( (res) => {
        return res.json();
        })
        .then ( (arr) => {
        setItems(arr);
        setIsLoading(false);
        });
        window.scrollTo(0,0);
    }, [])
    return(
        <>
        <div className="content__top">
            <Categories/>
            <Sort/>
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
        </>
       
    )
}

export default Home;