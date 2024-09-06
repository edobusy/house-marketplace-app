import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

const Offers = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  // Keep track of last listing fetched in current query. Assists pagination
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  useEffect(() => {
    const fetchListings = async () => {
      // Get reference
      const listingsRef = collection(db, 'listings')

      // Filter by offer, get first 10
      const q = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        limit(10)
      )
      // Execute query
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]

      setLastFetchedListing(lastVisible)

      // Update listings state
      const listings = []
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings(listings)
      setLoading(false)
    }

    fetchListings().catch((e) => toast.error('Could not fetch listings'))
  }, [])

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    // Get reference
    const listingsRef = collection(db, 'listings')

    // Get more listings, start from the one after lastFetchedListing
    const q = query(
      listingsRef,
      where('offer', '==', true),
      orderBy('timestamp', 'desc'),
      startAfter(lastFetchedListing),
      limit(10)
    )

    // Execute query
    const querySnap = await getDocs(q)

    // Update lastFetchedListing
    const lastVisible = querySnap.docs[querySnap.docs.length - 1]

    setLastFetchedListing(lastVisible)

    // Add loaded listings to the state
    const listings = []
    querySnap.forEach((doc) => {
      return listings.push({
        id: doc.id,
        data: doc.data(),
      })
    })

    setListings((prevState) => [...prevState, ...listings])
    setLoading(false)
  }

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>Offers</p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <ListingItem
                  id={listing.id}
                  listing={listing.data}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>

          <br />
          <br />

          {lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>There are no current offers</p>
      )}
    </div>
  )
}

export default Offers
