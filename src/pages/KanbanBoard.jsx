import React, { useState } from 'react';
import { Box, Flex, Heading, VStack, Button, Input, Textarea } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialColumns = {
  'todo': {
    name: 'To Do',
    items: []
  },
  'in-progress': {
    name: 'In Progress',
    items: []
  },
  'done': {
    name: 'Done',
    items: []
  }
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  const addTask = () => {
    if (newTask.title.trim() === '') return;
    const newTaskItem = { ...newTask, id: new Date().getTime().toString() };
    setColumns({
      ...columns,
      'todo': {
        ...columns['todo'],
        items: [...columns['todo'].items, newTaskItem]
      }
    });
    setNewTask({ title: '', description: '', dueDate: '' });
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Kanban Board</Heading>
      <Flex mb={4}>
        <Input
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          mr={2}
        />
        <Textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          mr={2}
        />
        <Input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          mr={2}
        />
        <Button onClick={addTask} colorScheme="teal">Add Task</Button>
      </Flex>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        <Flex>
          {Object.entries(columns).map(([columnId, column], index) => (
            <Box key={columnId} w="30%" p={2} mx={2} bg="gray.100" borderRadius="md">
              <Heading size="md" mb={4}>{column.name}</Heading>
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <VStack
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    bg={snapshot.isDraggingOver ? 'blue.100' : 'gray.100'}
                    p={4}
                    borderRadius="md"
                    minHeight="200px"
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            p={4}
                            mb={4}
                            bg="white"
                            borderRadius="md"
                            boxShadow="md"
                            opacity={snapshot.isDragging ? 0.8 : 1}
                          >
                            <Heading size="sm">{item.title}</Heading>
                            <Box>{item.description}</Box>
                            <Box fontSize="sm" color="gray.500">Due: {item.dueDate}</Box>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </VStack>
                )}
              </Droppable>
            </Box>
          ))}
        </Flex>
      </DragDropContext>
    </Box>
  );
};

export default KanbanBoard;