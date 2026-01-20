import { Client, Databases, ID, Query } from "appwrite"
import type { TrendingMovie } from "./types"

interface Movie {
    id: number
    poster_path: string | null
}

const DATA_BASE_ID = import.meta.env.VITE_APPWRITE_DATABASET_ID
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID


const client = new Client()
.setEndpoint('https://fra.cloud.appwrite.io/v1')
.setProject(PROJECT_ID)

const database = new Databases(client)

export const UpdateSearchTerm = async (searchTerm:string, movie:Movie) => {
  // Check if search term exits
  // If it exits increase the count
  // Else create a new document with the search term and set the count to one
  try {
    const result = await database.listDocuments(DATA_BASE_ID, 'metrices', [
        Query.equal("searchterm", searchTerm)
    ])
    if (result.documents.length > 0){
        const doc = result.documents[0]
        await database.updateDocument(DATA_BASE_ID, 'metrices', doc.$id, {
            count: doc.count + 1 
        })
        console.log("Document found:", result.documents[0])
    } else {
        await database.createDocument(DATA_BASE_ID, 'metrices', ID.unique(), {
            searchterm: searchTerm,
            count: 1,
            movieid: movie.id,
            posterurl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        })
        console.log('No document found, create new one')
    }
  } catch (error) {
    console.log(error)
  }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
   try {
    const results = await database.listDocuments(DATA_BASE_ID, 'metrices', [
        Query.limit(5),
        Query.orderDesc('count')
    ])

    return results.documents as unknown as TrendingMovie[]

   } catch (error) {
    console.log(error)
    return []
   }
}
