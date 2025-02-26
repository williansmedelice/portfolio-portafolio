import { useEffect, useState } from 'react'
import useClickOutside from '../../hooks/useClickOutside'

const VideoPopup_ = ({ close, videoID }) => {
  const domNode = useClickOutside(() => {
    close(false)
  })

  return (
    <>
      <div className='mfp-bg mfp-ready' onClick={() => close(false)}></div>
      <div
        className='mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready'
        tabIndex={-1}
        style={{ overflow: 'hidden auto' }}
      >
        <div className='mfp-container mfp-s-ready mfp-iframe-holder'>
          <div className='mfp-content' ref={domNode}>
            {/* <div className='mfp-iframe-scaler'>
              <button title='Close (Esc)' type='button' className='mfp-close' onClick={() => close()}>
                ×
              </button>
              <iframe
                src={videoID}
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div> */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <h1
                style={{
                  color: '#e3e2e2',
                  zIndex: '99999999',
                  position: 'absolute'
                }}
              >
                Próximamente video presentación...
              </h1>
            </div>
          </div>
          <div className='mfp-preloader'>Cargando...</div>
        </div>
      </div>
    </>
  )
}

const VideoPopup = () => {
  const [video, setVideo] = useState(false)
  const [videoValue, setVideoValue] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      const a = document.querySelectorAll('a')
      a.forEach(a => {
        if (a.href.includes('www.youtube.com') || a.href.includes('vimeo.com') || a.href.includes('soundcloud.com')) {
          a.addEventListener('click', e => {
            e.preventDefault()
            setVideoValue(a.href)
            setVideo(true)
            let href = a.href
            if (href.includes('youtube')) {
              setVideoValue(`//www.youtube.com/embed/${href.split('=')[1]}?autoplay=1`)
            } else if (href.includes('vimeo')) {
              let splitData = href.split('/')
              setVideoValue(`//player.vimeo.com/video/${splitData[splitData.length - 1]}?autoplay=1`)
            } else {
              setVideoValue(href)
            }
          })
        }
      })
    }, 1500)
  }, [])

  return <>{video && <VideoPopup_ close={() => setVideo(false)} videoID={videoValue} />}</>
}

export default VideoPopup
