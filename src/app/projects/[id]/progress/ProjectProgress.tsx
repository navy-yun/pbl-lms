'use client'

import { Project } from '@/types/project'
import { useState } from 'react'
import StepCard from './components/StepCard'

interface Props {
  project: Project
}

const ProjectProgress = ({ project }: Props) => {
  const [activeStepId, setActiveStepId] = useState<string | null>(null)

  const handleStepClick = (stepId: string) => {
    setActiveStepId(stepId === activeStepId ? null : stepId)
  }

  return (
    <div className="space-y-6">
      {project.steps.map((step) => (
        <StepCard
          key={step.id}
          step={step}
          isActive={step.id === activeStepId}
          onClick={() => handleStepClick(step.id)}
          submissions={project.submissions.filter((s) => s.stepId === step.id)}
        />
      ))}
    </div>
  )
}

export default ProjectProgress
