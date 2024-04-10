import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Box,
  ListItem,
  OrderedList,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UpdateTodo from "./UpdateTodo";
import axios from "axios";
import Resizable from "react-resizable-layout";
import GridLayout, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(GridLayout);
// import Resizable from "react-resizable-layout";

function Todo() {
  const baseUrl = process.env.baseurl || "http://localhost:8080";
  const toast = useToast();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/todo`);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    let response = await axios.post(`${baseUrl}/createtodo`, {
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
  const layout = [
    { i: "a", x: 0, y: 0, w: 4, h: 1 },
    { i: "b", x: 5, y: 0, w: 6, h: 1 },
    { i: "c", x: 0, y: 1, w: 10, h: 1 },
    // { i: 'd', x: 1, y: 1, w: 1, h: 1 }
  ];
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        autoSize={true}
        cols={10}
        rowHeight={300}
        style={{ width: "100%", height: "100%" }}
      >
        <div
          style={{ border: "2px solid lightgrey", width: "auto", height: "auto", overflow: "auto" }}
          key="a"
          data-grid={layout[0]}
          resizeHandles={["s", "e", "n", "w", "se", "sw", "ne", "nw"]}
        >
          <Heading>TO-DO LIST</Heading>
        </div>
        <div
          style={{ border: "2px solid lightgrey", width: "auto", height: "auto", overflow: "auto" }}
          key="b"
          data-grid={layout[1]}
          resizeHandles={["s", "e", "n", "w", "se", "sw", "ne", "nw"]}
        >
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
            <Button
              type="submit"
              m="4"
              colorScheme="cyan"
              onClick={handleSubmit}
            >
              Add Todo
            </Button>
          </FormControl>
        </div>
        <div
          style={{ border: "2px solid lightgrey"}}
          key="c"
          data-grid={layout[2]}
          resizeHandles={["s", "e", "n", "w", "se", "sw", "ne", "nw"]}
        >
          <Heading>TO-DO LIST</Heading>

          <Box  h='80%' w='auto' overflow='auto'>
          <OrderedList>
            {todos.map((e) => {
              return (
                <ListItem
                  border="2px solid lightgrey"
                  borderRadius="10px"
                  m="3"
                  p="3"
                >
                  <UpdateTodo key={e._id} todo={e} fetchData={fetchData} />
                </ListItem>
              );
            })}
          </OrderedList>
          </Box>

        </div>
      </ResponsiveGridLayout>


      {/* <Grid
        h="100%"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={4}
        margin={4}
      >
        <GridItem
          border="2px solid lightgrey"
          bgColor="#F0FFF4"
          borderRadius="10"
          // w={position}
        >
          <Heading>TO-DO LIST</Heading>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={2}
          border="2px solid lightgrey"
          p="4"
          bgColor="#FAF5FF"
          borderRadius="10"
        >
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
            <Button
              type="submit"
              m="4"
              colorScheme="cyan"
              onClick={handleSubmit}
            >
              Add Todo
            </Button>
          </FormControl>
        </GridItem>

        <GridItem
          rowSpan="1"
          colSpan="3"
          border="2px solid lightgrey"
          p="4"
          bgColor="#FFF5F5"
          borderRadius="10"
        >
          <Heading>TO-DO LIST</Heading>

          <OrderedList>
            {todos.map((e) => {
              return (
                <ListItem
                  border="2px solid lightgrey"
                  borderRadius="10px"
                  m="3"
                  p="3"
                >
                  <UpdateTodo key={e._id} todo={e} fetchData={fetchData} />
                </ListItem>
              );
            })}
          </OrderedList>
        </GridItem>
      </Grid> */}
    </>
  );
}

export default Todo;
