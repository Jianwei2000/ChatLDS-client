import React from 'react'

const CustomToast = ({thumbnail,name}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={thumbnail || 'user.png'}
        alt="頭像"
        style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 12 }}
      />
      <div style={{color:"#000"}}>
        <strong style={{color:"#6559a2"}}>{name || '匿名使用者'}</strong> 已加入聊天室
      </div>
    </div>
  )
}

export default CustomToast