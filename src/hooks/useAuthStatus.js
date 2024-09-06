import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  // Tracks if auth check is in progress
  const [checkingStatus, setCheckingStatus] = useState(true)

  // Run only on component mount
  useEffect(() => {
    const auth = getAuth()

    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true) // User is logged in
      }
      setCheckingStatus(false) // Auth check complete
    })
  })
  return { loggedIn, checkingStatus }
}

export default useAuthStatus
