"use client";
import { useState } from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@/components/ui/tabs";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableCaption,
  TableHeader,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectOption,
} from "@/components/ui/select";

export default function Home() {
  // Set up initial notes state
  const [notes, setNotes] = useState([
    { reviewed: false, name: "🚩The Apportionment Problem", class: "MAT 630", type: "Seminar", materials: "", created: "August 8, 2024" },
    { reviewed: true, name: "🎖️American Post-War Economics", class: "HIST 230", type: "Section", materials: "https://example.com", created: "August 8, 2024" },
    { reviewed: false, name: "💬Kazuo Ishiguro: Discussion", class: "LIT 455", type: "Study Group", materials: "https://example.com", created: "August 8, 2024" },
    { reviewed: true, name: "🎨Baroque Forms: Kandinsky", class: "ART 399", type: "Reading", materials: "https://example.com", created: "August 8, 2024" },
    { reviewed: false, name: "📚90's UK Literature", class: "LIT 455", type: "Lecture", materials: "", created: "August 8, 2024" },
    { reviewed: false, name: "🤖CS104: Lecture 5", class: "CSCI 104", type: "Lecture", materials: "https://example.com", created: "August 8, 2024" },
    { reviewed: false, name: "📐Area of triangles", class: "MAT 630", type: "Lecture", materials: "", created: "September 5, 2024" },
  ]);
  
  // State to handle filters
  const [filters, setFilters] = useState({ type: "All", class: "All" });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredNotes = notes.filter((note) => {
    if (filters.type !== "All" && note.type !== filters.type) return false;
    if (filters.class !== "All" && note.class !== filters.class) return false;
    return true;
  });

  const addNewNote = () => {
    // Add a new note (you can customize this with user input)
    const newNote = {
      reviewed: false,
      name: "New Note",
      class: "CSCI 104",
      type: "Lecture",
      materials: "",
      created: new Date().toLocaleDateString("en-US", {
        month: "long", // "August"
        day: "numeric", // "8"
        year: "numeric", // "2024"
      }),
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <div className="min-h-screen bg-lightGray p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-darkGray">Class Notes</h1>
          <p className="text-gray-500">Organize your notes efficiently.</p>
        </div>
        <Button
          onClick={addNewNote}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
        >
          New
        </Button>
      </div>

      {/* Tabs */}
      <Tabs>
        <TabList className="border-b border-borderGray mb-4">
          <Tab className="px-4 py-2 text-gray-700 hover:bg-hoverGray focus:outline-none">All notes</Tab>
          <Tab className="px-4 py-2 text-gray-700 hover:bg-hoverGray focus:outline-none">By course number</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <Select onValueChange={(value) => handleFilterChange("type", value)}>
                <SelectTrigger className="bg-white border border-borderGray rounded-md px-4 py-2 text-black">
                  Filter by type
                </SelectTrigger>
                <SelectContent>
                  <SelectOption value="All">All</SelectOption>
                  <SelectOption value="Lecture">Lecture</SelectOption>
                  <SelectOption value="Seminar">Seminar</SelectOption>
                  <SelectOption value="Study Group">Study Group</SelectOption>
                  <SelectOption value="Reading">Reading</SelectOption>
                  <SelectOption value="Section">Section</SelectOption>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => handleFilterChange("class", value)}>
                <SelectTrigger className="bg-white border border-borderGray rounded-md px-4 py-2 text-black">
                  Filter by class
                </SelectTrigger>
                <SelectContent>
                  <SelectOption value="All">All</SelectOption>
                  <SelectOption value="MAT 630">MAT 630</SelectOption>
                  <SelectOption value="HIST 230">HIST 230</SelectOption>
                  <SelectOption value="LIT 455">LIT 455</SelectOption>
                  <SelectOption value="ART 399">ART 399</SelectOption>
                  <SelectOption value="CSCI 104">CSCI 104</SelectOption>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="bg-white border border-borderGray rounded-lg shadow-sm">
              <Table>
                <TableCaption>Review your class notes.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reviewed</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Materials</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotes.map((note, idx) => (
                    <TableRow key={idx} className="hover:bg-hoverGray">
                      <TableCell className="px-4 py-2">
                        <Checkbox checked={note.reviewed} />
                      </TableCell>
                      <TableCell className="px-4 py-2">{note.name}</TableCell>
                      <TableCell className="px-4 py-2">{note.class}</TableCell>
                      <TableCell className="px-4 py-2">{note.type}</TableCell>
                      <TableCell className="px-4 py-2">
                        {note.materials ? (
                          <a href={note.materials} className="text-blue-500 hover:underline">
                            Link
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-2">{note.created}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
