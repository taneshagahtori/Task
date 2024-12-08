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
  
  // Handle checkbox toggle
  const handleCheckboxChange = (noteIndex) => {
    setNotes((prevNotes) =>
      prevNotes.map((note, idx) =>
        idx === noteIndex ? { ...note, reviewed: !note.reviewed } : note
      )
    );
  };

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
    const newNote = {
      reviewed: false,
      name: "New Note",
      class: "CSCI 104",
      type: "Lecture",
      materials: "",
      created: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const openModal = (note) => {
    setSelectedNote(note);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedNote(null);
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

          <div className="flex items-center gap-4 mb-6">
  {/* Filter by Type */}
  <div className="w-1/2">
    
    <select
      defaultValue=""
      onChange={(e) => handleFilterChange("type", e.target.value)}
      className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
    >
      <option value="" disabled hidden>
        Filter by Type
      </option>
      <option value="All">All</option>
      <option value="Lecture">Lecture</option>
      <option value="Seminar">Seminar</option>
      <option value="Study Group">Study Group</option>
      <option value="Reading">Reading</option>
      <option value="Section">Section</option>
    </select>
  </div>

  {/* Filter by Class */}
  <div className="w-1/2">
    
    <select
      defaultValue=""
      onChange={(e) => handleFilterChange("class", e.target.value)}
      className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
    >
      <option value="" disabled hidden>
        Filter by Class
      </option>
      <option value="All">All</option>
      <option value="MAT 630">MAT 630</option>
      <option value="HIST 230">HIST 230</option>
      <option value="LIT 455">LIT 455</option>
      <option value="ART 399">ART 399</option>
      <option value="CSCI 104">CSCI 104</option>
    </select>
  </div>
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
                    <TableRow
                      key={idx}
                      className="hover:bg-hoverGray cursor-pointer"
                      onClick={() => openModal(note)}
                    >
                      <TableCell className="px-4 py-2">
                        <Checkbox
                          checked={note.reviewed}
                          onChange={() => handleCheckboxChange(idx)}
                        />
                      </TableCell>
                      <TableCell className="px-4 py-2">{note.name}</TableCell>
                      <TableCell className="px-4 py-2">{note.class}</TableCell>
                      <TableCell className="px-4 py-2">{note.type}</TableCell>
                      <TableCell className="px-4 py-2">
                        {note.materials ? (
                          <a href={note.materials} className="text-blue-500 hover:underline">Link</a>
                        ) : "N/A"}
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

      {/* Modal */}
      {modalOpen && selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-3/4">
            <h2 className="text-lg font-bold mb-2">{selectedNote.name}</h2>
            <p><strong>Class:</strong> {selectedNote.class}</p>
            <p><strong>Type:</strong> {selectedNote.type}</p>
            <p><strong>Materials:</strong> {selectedNote.materials || "N/A"}</p>
            <p><strong>Created:</strong> {selectedNote.created}</p>
            <div className="mt-4 text-right">
              <Button
                onClick={closeModal}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
