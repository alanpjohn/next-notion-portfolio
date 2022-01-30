import { motion, useTransform, useViewportScroll } from "framer-motion";
import { PropsWithChildren, useLayoutEffect, useRef, useState } from "react";

type ParallaxProps = PropsWithChildren<{
    className?: string;
    range: number[];
}>;

export const Parallax: React.FC<ParallaxProps> = ({
    children,
    className = "",
    range,
}: ParallaxProps) => {
    const [elementTop, setElementTop] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useViewportScroll();

    const y = useTransform(scrollY, [elementTop, elementTop + 1], range, {
        clamp: false,
    });

    useLayoutEffect(() => {
        const offset = ref.current?.offsetTop;
        offset && setElementTop(offset);
    }, [ref]);

    return (
        <div ref={ref} className={` ${className}`}>
            <motion.div style={{ y }}>{children}</motion.div>
        </div>
    );
};
