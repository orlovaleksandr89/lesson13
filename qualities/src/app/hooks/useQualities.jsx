import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import qualityService from '../services/quality.service'

const QualitiesContext = React.createContext()

export const useQualities = () => {
  return useContext(QualitiesContext)
}
export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([])
  const [httperror, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await qualityService.fetchAll()
        setQualities(content)
        setIsLoading(false)
      } catch (error) {
        catchError(error)
      }
    }
    getQualities()
  }, [httperror])

  const getQuality = (id) => {
    const quality = qualities.find((x) => x._id === id)
    return quality
  }
  const updateQuality = async ({ _id, ...data }) => {
    try {
      const { content, message } = await qualityService.update(_id, data)
      toast.success(message)
      setQualities((prev) =>
        prev.map((item) => {
          if (item._id === content._id) {
            return content
          }
          return item
        })
      )
      return content
    } catch (error) {
      catchError(error)
    }
  }

  const addQuality = async (data) => {
    try {
      const { content, message } = await qualityService.create(data)
      setQualities((prev) => [...prev, content])
      toast.success(message)
      return content
    } catch (error) {
      catchError(error)
    }
  }

  const deleteQuality = async (id) => {
    try {
      const { content, message } = await qualityService.delete(id)
      setQualities((prev) => prev.filter((item) => item._id !== id))
      toast.success(message)
      return content
    } catch (error) {
      catchError(error)
    }
  }
  function catchError(error) {
    const { message } = error.response.data
    setError(message)
  }
  useEffect(() => {
    if (httperror !== null) {
      toast.error(httperror)
    }
  }, [httperror])

  return (
    <QualitiesContext.Provider
      value={{
        qualities,
        getQuality,
        updateQuality,
        addQuality,
        deleteQuality
      }}>
      {!isLoading ? children : <h1>Loading...</h1>}
    </QualitiesContext.Provider>
  )
}
