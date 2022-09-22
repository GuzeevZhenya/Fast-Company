import React, { useState, useEffect } from 'react'
import { Pagination } from './pagination'
import User from './user'
import { paginate } from '../utils/paginate'
import { GroupList } from './groupList'
import SearchStatus from './searchStatus'

import api from '../api'

const Users = ({ users, ...rest }) => {
  const pageSize = 6
  const [professions, setProfessions] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProf, setSelectedProf] = useState()

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, []);

  useEffect(()=>{
    setCurrentPage(1);
  },[selectedProf])

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  //Очистка выбора данных
  const clearFilter = () => {
    setSelectedProf()
  }

  //Пагинация
  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize
    return [...items].splice(startIndex, pageSize)
  }

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }
  //Фильт рация
  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession === selectedProf)
    : users
  const userCrop = paginate(filteredUsers, currentPage, pageSize)
  const count = filteredUsers.length
  return (
    <div className="d-flex">
      {professions && (
        <div className="div d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button
            className="btn btn-secondary mt-2"
            onClick={() => clearFilter()}
          >
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus length={count} />
        {count > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userCrop.map((user) => (
                <User key={user._id} {...rest} {...user} />
              ))}
            </tbody>
          </table>
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Users
