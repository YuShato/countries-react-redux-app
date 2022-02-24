import { useNavigate, useParams } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Button } from '../components/Button'
import { Info } from '../components/Info'
import { selectDetails } from '../store/details/details-selector'
import { loadCountryByName } from '../store/details/details-actions'

export const Details = () => {
  const { name } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentCountry, error, status } = useSelector(selectDetails)

  useEffect(() => {
    dispatch(loadCountryByName(name))
  }, [name, dispatch])

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {status === 'loading' && <h2> Loading...</h2>}
      {status === 'error' && <h2>{error.message}</h2>}
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </div>
  )
}
