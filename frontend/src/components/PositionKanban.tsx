import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';

// Mock data
const mockPositions = [
    {
        id: 1,
        title: 'Senior Backend Engineer',
        manager: 'John Doe',
        deadline: '2024-12-31',
        status: 'Abierto',
        interviewFlow: {
            id: 1,
            description: 'Standard development interview process',
            interviewSteps: [
                { id: 1, interviewFlowId: 1, interviewTypeId: 1, name: 'Initial Screening', orderIndex: 1 },
                { id: 2, interviewFlowId: 1, interviewTypeId: 2, name: 'Technical Interview', orderIndex: 2 },
                { id: 3, interviewFlowId: 1, interviewTypeId: 3, name: 'Manager Interview', orderIndex: 3 }
            ]
        }
    }
];

const mockCandidates = [
    { id: 1, fullName: 'Jane Smith', currentInterviewStep: 'Technical Interview', averageScore: 4 },
    { id: 2, fullName: 'Carlos García', currentInterviewStep: 'Initial Screening', averageScore: 0 },
    { id: 3, fullName: 'John Doe', currentInterviewStep: 'Manager Interview', averageScore: 5 }
];

interface Candidate {
    id: number;
    fullName: string;
    currentInterviewStep: string;
    averageScore: number;
}

interface InterviewStep {
    id: number;
    name: string;
}

const KanbanColumn = styled.div`
    background: #f8f9fa;
    border-radius: 8px;
    padding: 16px;
    min-height: 500px;
    margin-bottom: 16px;
`;

const CandidateCard = styled.div`
    background: white;
    border-radius: 4px;
    padding: 12px;
    margin-bottom: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const PositionKanban = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [positionName, setPositionName] = useState('');
    const [interviewSteps, setInterviewSteps] = useState<InterviewStep[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        // Simular carga de datos de la posición
        const position = mockPositions.find(p => p.id === Number(id));
        if (position) {
            setPositionName(position.title);
            setInterviewSteps(position.interviewFlow.interviewSteps);
        }
        // Simular carga de candidatos
        setCandidates(mockCandidates);
    }, [id]);

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { draggableId, destination } = result;
        
        // Simular actualización del estado del candidato
        const updatedCandidates = candidates.map(candidate => {
            if (candidate.id === Number(draggableId)) {
                const newStep = interviewSteps.find(step => step.id === Number(destination.droppableId));
                return {
                    ...candidate,
                    currentInterviewStep: newStep ? newStep.name : candidate.currentInterviewStep
                };
            }
            return candidate;
        });

        setCandidates(updatedCandidates);
    };

    return (
        <Container fluid className="py-4">
            <Row className="mb-4 align-items-center">
                <Col>
                    <Button variant="link" onClick={() => navigate('/positions')} className="me-3">
                        <ArrowLeft size={24} />
                    </Button>
                    <h2 className="d-inline-block m-0">{positionName}</h2>
                </Col>
            </Row>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Row className="flex-nowrap overflow-auto pb-3">
                    {interviewSteps.map((step) => (
                        <Col key={step.id} md={4} lg={3}>
                            <KanbanColumn>
                                <h5 className="mb-3">{step.name}</h5>
                                <Droppable droppableId={String(step.id)}>
                                    {(provided: DroppableProvided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {candidates
                                                .filter((candidate) => candidate.currentInterviewStep === step.name)
                                                .map((candidate, index) => (
                                                    <Draggable
                                                        key={candidate.id}
                                                        draggableId={String(candidate.id)}
                                                        index={index}
                                                    >
                                                        {(provided: DraggableProvided) => (
                                                            <CandidateCard
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <h6>{candidate.fullName}</h6>
                                                                {candidate.averageScore > 0 && (
                                                                    <span className="badge bg-primary">
                                                                        Score: {candidate.averageScore}
                                                                    </span>
                                                                )}
                                                            </CandidateCard>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </KanbanColumn>
                        </Col>
                    ))}
                </Row>
            </DragDropContext>
        </Container>
    );
};

export default PositionKanban; 