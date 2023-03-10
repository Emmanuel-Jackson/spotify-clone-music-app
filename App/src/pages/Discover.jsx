import { Error, Loader, SongCard } from '../components'
import { genres } from '../assets/constants'
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore'

import { useDispatch, useSelector } from 'react-redux';
import { selectGenreListId } from '../redux/features/playerSlice';

const Discover = () => {
    //Dispatch: dispatches an action to the store
    //Selector: With a selector, you can fetch the modified state (stated)
    const dispatch = useDispatch()
    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player)
    const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP')

    console.log(data)

    const genreTitle = genres.find(({ value }) => value === genreListId)?.title

    if(isFetching) return <Loader title="Loading..."/>

    if(error) return <Error />

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-white text-3xl text-left">Discover {genreTitle}</h2>
                <select
                    onChange={(e) => {dispatch(selectGenreListId(e.target.value))}}
                    value={genreListId || 'pop'}
                    className="bg-black text-gray-300 p-3 text rounded-lg outline-none"
                >
                    {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
                </select>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, i) => (
                    <SongCard 
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>
    )
};

export default Discover;
