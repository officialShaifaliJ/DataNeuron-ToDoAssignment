import {
  Button,
  Heading,
  Text,
  Box,
  Input,
  useToast,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function UpdateTodo({ todo, fetchData }) {
  const baseUrl = process.env.baseurl || "http://localhost:8080";
  const toast = useToast();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isUpdateOn, setIsUpdateOn] = useState(false);
  const [Title, setTitle] = useState(todo.title);
  const [Description, setDescription] = useState(todo.description);

  // Update isCompleted state when todo.completed changes
  useEffect(() => {
    setIsCompleted(todo.completed);
  }, [todo.completed]);

  const handleUpdate = async () => {
    try {
      await axios.patch(`${baseUrl}/updatetodo/${todo._id}`, {
        title: Title,
        description: Description,
      });
      setIsUpdateOn(false);
      toast({
        title: "Updated Successfully",
        description: "Todo has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
      fetchData();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleMarkCompleted = async () => {
    try {
      const updatedCompletedStatus = !isCompleted;
      await axios.patch(`${baseUrl}/updatetodo/${todo._id}`, {
        completed: updatedCompletedStatus,
      });
      // Update local state only after successful API call
      setIsCompleted(updatedCompletedStatus);
      toast({
        title: "Updated Successfully",
        description: `Todo has been ${
          isCompleted ? "Marked as Incompleted" : "Marked as Completed"
        }`,
        status: "success",
        position: "bottom-left",
        duration: 3000,
        isClosable: true,
      });
      fetchData();
    } catch (error) {
      console.error("Error marking as completed:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // Implement your delete logic here
      await axios.delete(`${baseUrl}/deletetodo/${todo._id}`);
      toast({
        title: "Deleted Successfully",
        description: "Todo has been deleted succesfully",
        status: "warning",
        position: "bottom-left",
        duration: 3000,
        isClosable: true,
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
      <Box
        key={todo._id}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        textAlign="left"
      >
        <Flex direction="row">
          <Checkbox
            colorScheme="green"
            isChecked={todo.completed}
            onChange={(e) => {
              handleMarkCompleted();
            }}
            m="1"
          ></Checkbox>
          <Box>
            {isUpdateOn ? (
              <Input
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
                placeHolder="Title"
              />
            ) : (
              <Heading
                as="h4"
                size="sm"
                textDecoration={isCompleted ? "line-through" : "none"}
              >
                {todo.title}
              </Heading>
            )}
            {isUpdateOn ? (
              <Input
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                placeHolder="Description"
              />
            ) : (
              <Text>
                <text
                  style={{
                    textDecoration: isCompleted ? "line-through" : "none",
                  }}
                >
                  {todo.description}
                </text>
              </Text>
            )}
          </Box>
        </Flex>

        <Box
          w="25%"
          display="flex"
          flexDirection={{ md: "row", sm: "column" }}
          alignItems={{ md: "center", sm: "left" }}
          justifyContent="space-evenly"
          gap="2"
        >
          {isUpdateOn ? (
            <Button size="sm" onClick={handleUpdate} colorScheme="blue">
              update
            </Button>
          ) : (
            <Button
              size="sm"
              colorScheme="teal"
              onClick={() => {
                setIsUpdateOn(true);
              }}
            >
              Edit the Todo
            </Button>
          )}

          <Button colorScheme="red" size="sm" onClick={handleDelete}>
            {" "}
            Delete
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default UpdateTodo;
