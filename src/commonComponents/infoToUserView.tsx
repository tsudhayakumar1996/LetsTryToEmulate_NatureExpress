import { ERROR_VARIANT_MODAL, INFO_VARIANT_MODAL, SUCCESS_VARIANT_MODAL } from '@/const/infoModalConsts'
import useInfoToUserViewMethods, { InfoModalType } from '@/queryClientMethods/useInfoToUserViewMethods'
import { ChildrenProp } from '@/types/common'
import { Box, useTheme } from '@mui/material'
import { animate, AnimatePresence, motion, useIsPresent, useMotionValue } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import Hdr3VarntTypo from './hdr3VarntTypo'
import WdthContnr from './wdthContnr'

export default function InfoToUserView({ children }: ChildrenProp) {
    // hook
    const ref = useRef<HTMLDivElement>(null)
    const { infoModalState, infoCloseHandler } = useInfoToUserViewMethods({ isFirstMount: true })

    // state
    const [size, setSize] = useState({ width: 0, height: 0 })

    // effect
    useEffect(() => {
        setSize({
            width: ref.current?.clientWidth || 0,
            height: ref.current?.clientHeight || 0
        })
    }, [ref])

    // handler
    const closeModal = () => {
        infoCloseHandler()
    }

    // const
    const { show } = infoModalState ?? {}
    const showModal = show && infoModalState

    return (
        <WdthContnr>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <div
                    ref={ref}
                    style={{ height: '100%' }}
                >
                    {children}
                    <AnimatePresence>
                        {showModal ? (
                            <ImmersiveOverlay
                                close={closeModal}
                                size={size}
                                infoModalState={infoModalState}
                            />
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>
        </WdthContnr>
    )
}

function GradientOverlay({
    size,
    infoModalState
}: {
    size: { width: number; height: number }
    infoModalState: InfoModalType
}) {
    // hook
    const breathe = useMotionValue(0)
    const isPresent = useIsPresent()
    const theme = useTheme()

    useEffect(() => {
        if (!isPresent) {
            animate(breathe, 0, { duration: 0.5, ease: 'easeInOut' })
        }

        async function playBreathingAnimation() {
            await animate(breathe, 1, {
                duration: 0.5,
                delay: 0.35,
                ease: [0, 0.55, 0.45, 1]
            })

            animate(breathe, [null, 0.7, 1], {
                duration: 15,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut'
            })
        }

        playBreathingAnimation()
    }, [isPresent, breathe])

    // const
    const enterDuration = 0.75
    const exitDuration = 0.5

    const expandingCircleRadius = size.width / 3
    const isHghtGrtrThnWdth = size.width < size.height
    const tknSize = isHghtGrtrThnWdth ? size.height : size.width
    const blurBgSize = tknSize * 1.6

    const { success, info, error } = theme.palette

    const variantColor = (() => {
        switch (infoModalState!.variant) {
            case ERROR_VARIANT_MODAL:
                return {
                    bgFrstLayr: error.main,
                    bgFrstLayrToAnimate: error.main
                }
            case INFO_VARIANT_MODAL:
                return {
                    bgFrstLayr: info.main,
                    bgFrstLayrToAnimate: info.main
                }

            case SUCCESS_VARIANT_MODAL:
                return {
                    bgFrstLayr: success.main,
                    bgFrstLayrToAnimate: success.main
                }

            default:
                return { bgFrstLayr: success.main, bgFrstLayrToAnimate: success.main }
        }
    })()

    return (
        <Box
            component={'div'}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1001 }}
        >
            <Box
                component={motion.div}
                initial={{
                    scale: 0,
                    opacity: 1,
                    backgroundColor: variantColor.bgFrstLayr
                }}
                animate={{
                    scale: 10,
                    opacity: 0.2,
                    backgroundColor: variantColor.bgFrstLayrToAnimate,
                    transition: {
                        duration: enterDuration,
                        opacity: { duration: enterDuration, ease: 'easeInOut' }
                    }
                }}
                exit={{
                    scale: 0,
                    opacity: 1,
                    backgroundColor: variantColor.bgFrstLayr,
                    transition: { duration: exitDuration }
                }}
                style={{
                    position: 'absolute',
                    borderRadius: '50%',
                    filter: 'blur(15px)',
                    transformOrigin: 'center',
                    willChange: 'transform',
                    left: `calc(50% - ${expandingCircleRadius / 2}px)`,
                    top: '100%',
                    width: expandingCircleRadius,
                    height: expandingCircleRadius,
                    originX: 0.5,
                    originY: 1
                }}
            />

            <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 0.9,
                    transition: { duration: enterDuration }
                }}
                exit={{
                    opacity: 0,
                    transition: { duration: exitDuration }
                }}
                sx={{
                    background: variantColor.bgFrstLayrToAnimate,
                    position: 'absolute',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    aspectRatio: 1,
                    willChange: 'transform',
                    width: blurBgSize,
                    height: blurBgSize,
                    top: -100,
                    left: -100
                }}
                style={{
                    scale: breathe
                }}
            />

            <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 0.9,
                    transition: { duration: enterDuration }
                }}
                exit={{
                    opacity: 0,
                    transition: { duration: exitDuration }
                }}
                sx={{
                    background: variantColor.bgFrstLayrToAnimate,
                    position: 'absolute',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    aspectRatio: 1,
                    willChange: 'transform',
                    width: blurBgSize,
                    height: blurBgSize,
                    bottom: -100,
                    right: -100
                }}
                style={{
                    scale: breathe
                }}
            />
        </Box>
    )
}

function ImmersiveOverlay({
    close,
    size,
    infoModalState
}: {
    close: () => void
    size: { width: number; height: number }
    infoModalState: InfoModalType
}) {
    const transition = {
        duration: 0.35,
        ease: [0.5, 0, 0.35, 1]
    }

    const enteringState = {
        rotateX: 0,
        skewY: 0,
        scaleY: 1,
        scaleX: 1,
        y: 0,
        transition: {
            ...transition,
            y: { type: 'spring', visualDuration: 0.7, bounce: 0.2 }
        }
    }

    const exitingState = {
        rotateX: -5,
        skewY: -1.5,
        scaleY: 2,
        scaleX: 0.4,
        y: 100
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden'
            }}
            onClick={close}
        >
            <GradientOverlay
                size={size}
                infoModalState={infoModalState}
            />
            <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
                sx={{
                    zIndex: 1001,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%'
                }}
            >
                <Box
                    component={motion.div}
                    onClick={(e) => e.stopPropagation()}
                    initial={exitingState}
                    animate={enteringState}
                    exit={exitingState}
                    transition={transition}
                    sx={{
                        transformPerspective: 1000,
                        originX: 0.5,
                        originY: 0
                    }}
                >
                    <Hdr3VarntTypo
                        text={infoModalState.msg}
                        sx={{ color: '#000', fontSize: '40px', textAlign: 'center' }}
                    />
                </Box>
            </Box>
        </Box>
    )
}
