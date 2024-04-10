import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  ListItem,
  OrderedList,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UpdateTodo from "./UpdateTodo";
import axios from "axios";

function Todo() {
  const baseUrl = process.env.baseurl || "http://localhost:8080";
  const toast = useToast();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/todo");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    let response = await axios.post("http://localhost:8080/createtodo", {
      title,
      description,
      completed: false,
    });
    console.log(response);
    toast({
      title: "Submit Successfully",
      description: "Todo has been Added to list successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-left",
    });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid
      h="100%"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={4}
      margin={4}
    >
      <GridItem border="2px solid lightgrey" bgColor='#F0FFF4' borderRadius='10'>
        <Heading>TO-DO LIST</Heading>
      </GridItem>

      <GridItem rowSpan={1} colSpan={2} border="2px solid lightgrey" p="4" bgColor='#FAF5FF' borderRadius='10'>
        <Heading> ADD YOUR TODO HERE -</Heading>

        <FormControl>
          <FormLabel>Title :</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="title"
          />
          <FormLabel>Description :</FormLabel>
          <Input
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="description"
          />
          <Button type="submit" m="4" colorScheme='cyan' onClick={handleSubmit}>
            Add Todo
          </Button>
        </FormControl>

      </GridItem>


      <GridItem rowSpan="1" colSpan="3" border="2px solid lightgrey" p="4" bgColor='#FFF5F5' borderRadius='10'>
        <Heading>TO-DO LIST</Heading>

        <OrderedList>
          {todos.map((e) => {
            return (
              <ListItem border='2px solid lightgrey' borderRadius='10px' m='3' p='3'>
                <UpdateTodo key={e._id} todo={e} fetchData={fetchData} />
              </ListItem>
            );
          })}
        </OrderedList>

      </GridItem>


    </Grid>
  );
}

export default Todo;
