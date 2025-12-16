import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StepWizardProps {
    currentStep: number;
    children: React.ReactNode;
}

export default function StepWizard({ currentStep, children }: StepWizardProps) {
    const steps = React.Children.toArray(children);

    return (
        <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={currentStep}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full"
                >
                    {steps[currentStep - 1]}
                </motion.div>
            </AnimatePresence>

            {/* Step Indicators */}
            {steps.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index + 1 === currentStep
                                    ? 'w-8 bg-neutral-900'
                                    : index + 1 < currentStep
                                        ? 'w-1.5 bg-neutral-900'
                                        : 'w-1.5 bg-neutral-200'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
