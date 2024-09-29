import React from 'react';

interface AvatarImageProps {
  author: string
}

export function AvatarImage({ author }: AvatarImageProps) {
  const initials = author
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const backgroundColor = stringToColor(author)

  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3"
      style={{ backgroundColor }}
    >
      {initials}
    </div>
  )
}

function stringToColor(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += ('00' + value.toString(16)).substr(-2)
  }
  return color
}