
const createQueryParams = (
  page = 1,
  limit = 10,
  sort = 'name',
  asc = true,
  searchText = '',
): string => {
  let query = `?page=${page}&limit=${limit}&sort=${asc ? '' : '-'}${sort}`
  if (searchText) {
    query += `&q=${searchText}`
  }
  return query;
}

export default createQueryParams
