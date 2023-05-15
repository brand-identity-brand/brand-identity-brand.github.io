export default function AppIcon(){
    return (
      <div style={{
        position: 'relative',
        height: '100px',
        width: '70px',
        // backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        // padding: '2px'
      }}>
  
        <div style={{
          position: 'relative',
          height: '70%',
          width: '100%',
          // backgroundColor: 'green',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}>
          <div style={{
            position: 'relative',
            // height: '80%',
            width: '80%',
            aspectRatio: ' 1 / 1 ',
            backgroundColor: 'red',
          }}>
          img
         </div>
        </div>
        <div style={{
          position: 'relative',
          height: '30%',
          width: '100%',
          backgroundColor: 'yellow',
          display: 'flex',
          flexDirection: 'row',
          textAlign: 'center'
        }}>
          <span style={{ fontFamily: 'seriff'}}> a very long title </span>
        </div>
      </div>
    )
  }