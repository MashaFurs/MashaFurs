// import React, {useState} from 'react';

function Categories (props) {
 
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
      <div className="categories">
                  <ul>
                    {
                      categories.map( (categoryName, index) => (
                        <li onClick={ () => props.onClickCategory (index) } className={props.categoryId===index?"active":""} key={index}>{categoryName}</li>
                      ))}
                  </ul>
                </div>
    )
  }

  export default Categories;