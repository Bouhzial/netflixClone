import React from 'react'
import { useRecoilValue } from 'recoil';
import {magentlink,moviestate} from '../atoms/atom'
import {Helmet} from 'react-helmet'



export default function vedio() {
  const magent = useRecoilValue(magentlink)
  const movie = useRecoilValue(moviestate)

  window.webtor = window.webtor || [];
  window.webtor.push({
      id: 'player',
      magnet: 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F',
      on: function(e) {
          if (e.name == window.webtor.TORRENT_FETCHED) {
              console.log('Torrent fetched!', e.data);
          }
          if (e.name == window.webtor.TORRENT_ERROR) {
              console.log('Torrent error!');
          }
      },
      poster: 'https://via.placeholder.com/150/0000FF/808080',
      subtitles: [
          {
              srclang: 'en',
              label: 'test',
              src: movie.poster_path,
              default: true,
          }
      ],
      lang: 'en',
      i18n: {
          en: {
              common: {
                  "prepare to play": "Preparing Video Stream... Please Wait...",
              },
              stat: {
                  "seeding": "Seeding",
                  "waiting": "Client initialization",
                  "waiting for peers": "Waiting for peers",
                  "from": "from",
              },
          },
      },
  });

  return (
    <div>
      <Helmet>
      <script src="https://cdn.jsdelivr.net/npm/@webtor/player-sdk-js/dist/index.min.js" charSet='utf-8' async></script>
      </Helmet>
    
    <div id="player" className='h-full max-w-full'/>

    </div>
  )
}
