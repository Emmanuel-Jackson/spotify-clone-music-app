import SongBar from './SongBar'

const RelatedSongs = ({ data, artistId, isPlaying, activeSong, handlePlayClick, handlePauseClick }) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Related Songs</h1>

    <div className="mt-6 w-full flex flex-col">
      {data?.map((song, i) => (
        <SongBar 
          key={`${song.key}-${artistId}`} //we're doing this because sometimes data is not always going to be about songs (song.key), it can be about the artists (artist.key)
          song={song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePlayClick={handlePlayClick}
          handlePauseClick={handlePauseClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
