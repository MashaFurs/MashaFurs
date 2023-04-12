
function Categories (props) {
 
  const categories = ['Все', 'iPhone', 'iPad', 'Mac', 'Watch', 'AirPods']

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