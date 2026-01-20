
const Search = ({SearchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
      <div>
        <img src="./search.svg" alt="" />
        <input 
            type="text" 
            placeholder='Search though 300+ movies online'
            onChange={(e) => {
                setSearchTerm(e.target.value)
                }
            }
        />
      </div>
    </div>
  )
}

export default Search
