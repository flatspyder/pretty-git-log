import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { popoverVariants } from '@/lib/motion';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, children, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={clsx(
        'z-50 w-72 rounded-md border bg-white dark:bg-zinc-800 p-4 text-slate-900 dark:text-slate-50 shadow-md outline-none',
        className
      )}
      {...props}
    >
      <AnimatePresence>
        <motion.div
          variants={popoverVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
