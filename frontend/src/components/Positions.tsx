import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Position {
    id: number;
    title: string;
    manager: string;
    deadline: string;
    status: 'Abierto' | 'Contratado' | 'Cerrado' | 'Borrador';
    interviewFlow: {
        id: number;
        description: string;
        interviewSteps: Array<{
            id: number;
            interviewFlowId: number;
            interviewTypeId: number;
            name: string;
            orderIndex: number;
        }>;
    };
}

// Mock data that matches the API structure
const mockPositions: Position[] = [
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
    },
    {
        id: 2,
        title: 'Junior Android Engineer',
        manager: 'Jane Smith',
        deadline: '2024-11-15',
        status: 'Contratado',
        interviewFlow: {
            id: 2,
            description: 'Mobile development interview process',
            interviewSteps: [
                { id: 4, interviewFlowId: 2, interviewTypeId: 1, name: 'Initial Screening', orderIndex: 1 },
                { id: 5, interviewFlowId: 2, interviewTypeId: 2, name: 'Mobile Dev Test', orderIndex: 2 },
                { id: 6, interviewFlowId: 2, interviewTypeId: 3, name: 'Final Interview', orderIndex: 3 }
            ]
        }
    },
    {
        id: 3,
        title: 'Product Manager',
        manager: 'Alex Jones',
        deadline: '2024-07-31',
        status: 'Borrador',
        interviewFlow: {
            id: 3,
            description: 'Product management interview process',
            interviewSteps: [
                { id: 7, interviewFlowId: 3, interviewTypeId: 1, name: 'Initial Call', orderIndex: 1 },
                { id: 8, interviewFlowId: 3, interviewTypeId: 2, name: 'Case Study', orderIndex: 2 },
                { id: 9, interviewFlowId: 3, interviewTypeId: 3, name: 'Team Interview', orderIndex: 3 }
            ]
        }
    }
];

const Positions: React.FC = () => {
    const navigate = useNavigate();
    const [positions, setPositions] = useState<Position[]>([]);

    useEffect(() => {
        // Simulating API call
        setPositions(mockPositions);
    }, []);

    const handleViewProcess = (positionId: number) => {
        navigate(`/positions/${positionId}`);
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Posiciones</h2>
            <Row className="mb-4">
                <Col md={3}>
                    <Form.Control type="text" placeholder="Buscar por título" />
                </Col>
                <Col md={3}>
                    <Form.Control type="date" placeholder="Buscar por fecha" />
                </Col>
                <Col md={3}>
                    <Form.Control as="select">
                        <option value="">Estado</option>
                        <option value="open">Abierto</option>
                        <option value="filled">Contratado</option>
                        <option value="closed">Cerrado</option>
                        <option value="draft">Borrador</option>
                    </Form.Control>
                </Col>
                <Col md={3}>
                    <Form.Control as="select">
                        <option value="">Manager</option>
                        <option value="john_doe">John Doe</option>
                        <option value="jane_smith">Jane Smith</option>
                        <option value="alex_jones">Alex Jones</option>
                    </Form.Control>
                </Col>
            </Row>
            <Row>
                {positions.map((position) => (
                    <Col md={4} key={position.id} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>{position.title}</Card.Title>
                                <Card.Text>
                                    <strong>Manager:</strong> {position.manager}<br />
                                    <strong>Deadline:</strong> {position.deadline}
                                </Card.Text>
                                <span className={`badge ${position.status === 'Abierto' ? 'bg-warning' : position.status === 'Contratado' ? 'bg-success' : position.status === 'Borrador' ? 'bg-secondary' : 'bg-warning'} text-white`}>
                                    {position.status}
                                </span>
                                <div className="d-flex justify-content-between mt-3">
                                    <Button 
                                        variant="primary"
                                        onClick={() => handleViewProcess(position.id)}
                                    >
                                        Ver proceso
                                    </Button>
                                    <Button variant="secondary">Editar</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Positions;