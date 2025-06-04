import { useRef } from 'react'

import { Box, Grid } from '@mui/material'
import { motion, useScroll, useTransform } from 'motion/react'

import CmnButton from '@/commonComponents/cmnButton'
import { ChildrenProp } from '@/types/common'
import { useNavigate } from 'react-router'

const TypeWritter = ({ text }: { text: string }) => {
    // const
    const LETTER_DELAY = 0.025
    const BOX_FADE_DURATION = 0.125

    return (
        <Box sx={{ maxWidth: '600px', margin: { sm: 'auto' } }}>
            {text.split('').map((l, idx) => (
                <Box
                    component={'span'}
                    sx={{ position: 'relative' }}
                    key={idx}
                >
                    <Box
                        component={motion.span}
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: idx * LETTER_DELAY,
                            duration: 0
                        }}
                    >
                        {l}
                    </Box>
                    <Box
                        component={motion.span}
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            delay: idx * LETTER_DELAY,
                            times: [0, 0.1, 1],
                            duration: BOX_FADE_DURATION,
                            ease: 'easeInOut'
                        }}
                        sx={{ position: 'absolute', inset: 0, backgroundColor: '#000' }}
                    />
                </Box>
            ))}
        </Box>
    )
}

const TxtWthBtn = () => {
    // hook
    const navigate = useNavigate()
    return (
        <Grid
            container
            sx={{ zIndex: 0 }}
            spacing={6}
            px={2}
            py={6}
        >
            <Grid
                size={{ xs: 12, md: 6 }}
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <h1>Hello there...</h1>
                <CmnButton
                    disabled={false}
                    sx={{ mb: 2 }}
                    title={'Submit'}
                    type="button"
                    variant="outlined"
                    onClick={() => navigate('/auth/login')}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TypeWritter
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
          rhoncus quam.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
          rhoncus quam.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
          rhoncus quam.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
          rhoncus quam.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
          rhoncus quam.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
          rhoncus quam"
                />
            </Grid>
        </Grid>
    )
}

const ParrlxContnt = () => {
    return (
        <>
            <TxtImgParrlxContnt
                height="85vh"
                img="https://images.pexels.com/photos/1251026/pexels-photo-1251026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                subHead="We can do onething to nature! planting more trees!!"
                head="Planting"
            >
                <TxtWthBtn />
            </TxtImgParrlxContnt>
            <TxtImgParrlxContnt
                height="85vh"
                img="https://images.pexels.com/photos/1151418/pexels-photo-1151418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                subHead="Our job here is to continuously take care of those"
                head="Growing"
            >
                <TxtWthBtn />
            </TxtImgParrlxContnt>
            <TxtImgParrlxContnt
                height="85vh"
                img="https://images.pexels.com/photos/142497/pexels-photo-142497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                subHead="One day under good care it will be grown like a tree"
                head="Grown"
            >
                <TxtWthBtn />
            </TxtImgParrlxContnt>
            <TxtImgParrlxContnt
                height="100vh"
                img="https://images.pexels.com/photos/113338/pexels-photo-113338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                subHead="Eventhough this is a little impact to nature"
                head="Our impact"
            >
                <TxtWthBtn />
            </TxtImgParrlxContnt>
        </>
    )
}

const TxtImgParrlxContnt = ({
    img,
    subHead,
    head,
    children,
    height
}: {
    img: string
    subHead: string
    head: string
    height: string
} & ChildrenProp) => {
    return (
        <div>
            <Box
                // component={motion.div}
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 1 }}
                // transition={{ duration: 1 }}
                sx={{ position: 'relative', minHeight: height }}
            >
                <StickyImage img={img}>{children}</StickyImage>
                <OverlayTxt
                    head={head}
                    subHead={subHead}
                />
            </Box>
        </div>
    )
}

const OverlayTxt = ({ head, subHead }: { head: string; subHead: string }) => {
    // hook
    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start end', 'end start']
    })
    const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, 1, -1.5])

    return (
        <Box
            ref={targetRef}
            component={motion.div}
            style={{
                opacity
            }}
            sx={{
                position: 'absolute',
                top: 0,
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                width: { xs: '100%', md: '50%' },
                zIndex: 1
            }}
        >
            <p style={{ margin: 0, textAlign: 'center' }}>{subHead}</p>
            <h1 style={{ textAlign: 'center' }}>{head}</h1>
        </Box>
    )
}

const StickyImage = ({ img, children }: { img: string } & ChildrenProp) => {
    // hook
    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end start']
    })
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
    const invertOpac = useTransform(scrollYProgress, [1, 0], [-4, 1])

    return (
        <>
            <Box
                ref={targetRef}
                component={motion.div}
                sx={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '400px',
                    width: { xs: '100%', md: '50%' },
                    top: 0,
                    position: 'sticky',
                    zIndex: 1,
                    borderEndEndRadius: '16px'
                }}
                style={{ scale }}
            >
                <Box
                    component={motion.div}
                    sx={{
                        position: 'absolute',
                        borderRadius: 4,
                        backgroundColor: 'black',
                        inset: 0
                    }}
                    style={{ opacity }}
                />
            </Box>
            <Box
                component={motion.div}
                style={{ opacity: invertOpac }}
            >
                {children}
            </Box>
        </>
    )
}

export default ParrlxContnt
