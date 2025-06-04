import { useEffect, useRef } from 'react'

import { Box } from '@mui/material'
import { motion, useAnimation, useInView } from 'motion/react'

import { ChildrenProp } from '@/types/common'

const variants = {
    hidden: {
        opacity: 0,
        y: 10
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

const HeroUI = () => {
    return (
        <Box sx={{ zIndex: -1, position: 'inherit' }}>
            <Hero>
                <div>
                    <h1>Hello there...</h1>
                </div>
            </Hero>
            <article
                style={{
                    maxWidth: 500,
                    padding: '150px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20
                }}
            >
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac rhoncus quam.</p>
                <Hero>
                    <div>
                        <h1>Hello there...</h1>
                    </div>
                </Hero>
                <p>
                    In eget sodales arcu, consectetur efficitur metus. Duis efficitur tincidunt odio, sit amet laoreet
                    massa fringilla eu.
                </p>
                <p>Sed sem nisi, luctus consequat ligula in, congue sodales nisl.</p>
                <Hero>
                    <div>
                        <h1>Hello there...</h1>
                    </div>
                </Hero>
                <p>
                    Vestibulum bibendum at erat sit amet pulvinar. Pellentesque pharetra leo vitae tristique rutrum.
                    Donec ut volutpat ante, ut suscipit leo.
                </p>
                <Hero>
                    <div>
                        <h1>Hello there...</h1>
                    </div>
                </Hero>
                <p>
                    In eget sodales arcu, consectetur efficitur metus. Duis efficitur tincidunt odio, sit amet laoreet
                    massa fringilla eu.
                </p>
                <Hero>
                    <div>
                        <h1>Hello there...</h1>
                    </div>
                </Hero>
                <h2>Sub-header</h2>
                <Hero>
                    <div>
                        <h1>Hello there...</h1>
                    </div>
                </Hero>
                <p>
                    Morbi ut scelerisque nibh. Integer auctor, massa non dictum tristique, elit metus efficitur elit, ac
                    pretium sapien nisl nec ante. In et ex ultricies, mollis mi in, euismod dolor.
                </p>
                <p>Quisque convallis ligula non magna efficitur tincidunt.</p>
            </article>
        </Box>
    )
}

export default HeroUI

const Hero = ({ children }: ChildrenProp) => {
    // hook
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false })
    const mainControl = useAnimation()
    const slideControl = useAnimation()

    // effect
    useEffect(() => {
        if (isInView) {
            mainControl.start('visible')
            slideControl.start('visible')
        } else {
            mainControl.start('hidden')
            slideControl.start('hidden')
        }
    }, [isInView, mainControl, slideControl])

    return (
        <div
            ref={ref}
            style={{ position: 'relative' }}
        >
            <motion.div
                variants={variants}
                initial="hidden"
                animate={mainControl}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                {children}
            </motion.div>
            <Box
                component={motion.div}
                variants={{
                    hidden: { left: 0 },
                    visible: { left: '100%' }
                }}
                initial="hidden"
                animate={slideControl}
                transition={{
                    duration: 1,
                    ease: 'easeIn'
                }}
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: (theme) =>
                        `linear-gradient(${theme.palette.primary.dark}, ${theme.palette.primary.light});`,
                    zIndex: 2
                }}
            />
        </div>
    )
}
