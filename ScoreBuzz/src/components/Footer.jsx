import React from 'react'
import { footerStyles } from '../assets/dummyStyles'

function Footer() {
  return (
    
    <footer className={footerStyles.container}>
      <div className={footerStyles.innerContainer}>
         <div className={footerStyles.content}>
            <div className={footerStyles.logoContainer}>
               <div>
                <div className={footerStyles.copyright}>
                  &copy; {new Date().getFullYear()} Cricket live Score
                </div>
               </div>
            </div>
         </div>
      </div>
    </footer>
  )
}

export default Footer