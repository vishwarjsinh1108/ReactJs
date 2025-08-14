import React, { useState } from 'react'
import Sidebar from '../componenets/Sidebar'
import DataSearch from '../componenets/DataSearch'
import './Mainpage.css'
const Mainpage = () => {
	const [searchId, setSearchId] = useState('')
	const [searchName, setSearchName] = useState('')
	const [searchCity, setSearchCity] = useState('')
	const [sortOrder, setSortOrder] = useState('')
	const [filterGender, setFilterGender] = useState('')

	return (
		<div className='mainpage'>
			
			<div className='sidebar'>
				<Sidebar
					searchId={searchId}
					setSearchId={setSearchId}
					searchName={searchName}
					setSearchName={setSearchName}
					searchCity={searchCity}
					setSearchCity={setSearchCity}
					sortOrder={sortOrder}
					setSortOrder={setSortOrder}
					filterGender={filterGender}
					setFilterGender={setFilterGender}
				/>
			</div>
			<div className='data-search'>
				<DataSearch
					searchId={searchId}
					searchName={searchName}
					searchCity={searchCity}
					sortOrder={sortOrder}
					filterGender={filterGender}
				/>
			</div>
		</div>
	)
}

export default Mainpage