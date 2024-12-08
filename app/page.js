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
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

const getRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
};

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


  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  

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
    const matchesType = filters.type === "All" || note.type === filters.type;
    const matchesClass = filters.class === "All" || note.class === filters.class;
    const matchesSearch = note.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesClass && matchesSearch;
  });
  

  // Utility function to generate random colors


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
    classColor: getRandomColor(),
    typeColor: getRandomColor(),
  };

  setNotes((prevNotes) => [...prevNotes, newNote]);
};

  // Modal state using ShadCN Dialog
  
  const [selectedNote, setSelectedNote] = useState(null);
  
  const [dialogOpen, setDialogOpen] = useState(false);
const [editDialogOpen, setEditDialogOpen] = useState(false);
const [currentNote, setCurrentNote] = useState({
  name: '',
  class: '',
  type: '',
  materials: '',
});  

  const openEditDialog = (note) => {
    setCurrentNote(note);
    setEditDialogOpen(true);
  };
  
  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentNote(null);
  };

  // const handleSaveChanges = () => {
  //   setNotes((prevNotes) =>
  //     prevNotes.map((note) =>
  //       note === currentNote ? { ...note, name: currentNote.name, type: currentNote.type, materials: currentNote.materials } : note
  //     )
  //   );
  //   closeEditDialog();
  // };
  const handleSaveChanges = () => {
    console.log("Saved changes:", currentNote);
    setEditDialogOpen(false);
  };


  const openDialog = (note) => {
    setSelectedNote(note);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedNote(null);
  };

  const renderClass = (note) => {
  const style = {
    background: note.classColor || getColorForClass(note.class).background,
    color: "white",
    padding: "4px",
    borderRadius: "4px",
  };
  return <div style={style}>{note.class}</div>;
};

const renderType = (note) => {
  const style = {
    background: note.typeColor || getColorForType(note.type).background,
    color: "white",
    padding: "4px",
    borderRadius: "4px",
  };
  return <div style={style}>{note.type}</div>;
};

  // Function to map colors to types and classes
  const getColorForType = (type) => {
    switch (type) {
      case "Lecture":
        return { background: "rgb(220, 240, 255)", color: "rgb(10, 60, 110)" };
      case "Seminar":
        return { background: "rgb(240, 220, 255)", color: "rgb(70, 10, 110)" };
      case "Study Group":
        return { background: "rgb(220, 255, 220)", color: "rgb(10, 110, 30)" };
      case "Reading":
        return { background: "rgb(255, 245, 210)", color: "rgb(110, 90, 10)" };
      case "Section":
        return { background: "rgb(255, 230, 230)", color: "rgb(110, 10, 10)" };
      default:
        return { background: "rgb(240, 240, 240)", color: "rgb(50, 50, 50)" };
    }
  };

  const getColorForClass = (className) => {
    switch (className) {
      case "MAT 630":
        return { background: "rgb(255, 220, 220)", color: "rgb(110, 10, 10)" };
      case "HIST 230":
        return { background: "rgb(220, 255, 220)", color: "rgb(10, 110, 30)" };
      case "LIT 455":
        return { background: "rgb(255, 245, 210)", color: "rgb(110, 90, 10)" };
      case "ART 399":
        return { background: "rgb(240, 220, 255)", color: "rgb(70, 10, 110)" };
      case "CSCI 104":
        return { background: "rgb(220, 240, 255)", color: "rgb(10, 60, 110)" };
      default:
        return { background: "rgb(240, 240, 240)", color: "rgb(50, 50, 50)" };
    }
  };

  return (
    <div className="min-h-screen bg-lightGray p-6">
      <div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="text-3xl font-bold text-darkGray">📝Class Notes</h1>
    <p className="text-gray-500">Organize your notes efficiently.</p>
  </div>
  <div className="flex items-center gap-4">
    {/* Search Input */}
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder="Search notes..."
      className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    
    {/* New Button */}
    <Button
      onClick={addNewNote}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
    >
      New
    </Button>
  </div>
</div>


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


            
            <Table >
              
              <TableCaption>Review your class notes.</TableCaption>
              <TableHeader>
                <TableRow>
                <TableHead>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className="h-5 w-5 inline-block mr-1"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
    />
  </svg>
  Reviewed
</TableHead>

<TableHead>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className="h-5 w-5 inline-block mr-1"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" 
    />
  </svg>
  Name
</TableHead>

                  <TableHead>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className="h-5 w-5 inline-block mr-1"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
    />
  </svg>
  Class
</TableHead>

<TableHead>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className="h-5 w-5 inline-block mr-1"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
    />
  </svg>
  Type
</TableHead>

<TableHead>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className="h-5 w-5 inline-block mr-1"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" 
    />
  </svg>
  Materials
</TableHead>

<TableHead>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className="h-5 w-5 inline-block mr-1"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
    />
  </svg>
  Created
</TableHead>

                </TableRow>
              </TableHeader>
              <TableBody>
  {filteredNotes.map((note, idx) => (
    <TableRow
      key={idx}
      className="hover:bg-hoverGray cursor-pointer"
      onClick={() => openDialog(note)}
    >
      <TableCell onPointerDown={(e) => e.stopPropagation()}>
        <Checkbox
          checked={note.reviewed}
          onCheckedChange={() => handleCheckboxChange(idx)}
        />
      </TableCell>
      <TableCell>{note.name}</TableCell>
      <TableCell>
        <div style={{ ...getColorForClass(note.class), padding: "4px", borderRadius: "4px" }}>
          {note.class}
        </div>
      </TableCell>
      <TableCell>
        <div style={{ ...getColorForType(note.type), padding: "4px", borderRadius: "4px" }}>
          {note.type}
        </div>
      </TableCell>
      <TableCell>
        {note.materials ? <a href={note.materials}>Link</a> : "N/A"}
      </TableCell>
      <TableCell>{note.created}</TableCell>
      {/* Added Edit Button */}
      {/* <TableCell>
        <Button
          onClick={() => openEditDialog(note)}
          className="bg-blue-100 hover:bg-yellow-600 text-gray px-2 py-1 rounded-md"
        >
          Edit
        </Button>
      </TableCell> */}
    </TableRow>
  ))}
</TableBody>

            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {dialogOpen && selectedNote && (
  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogTitle>Note Details</DialogTitle>
      </DialogHeader>
      <DialogDescription asChild>
        <div className="space-y-2">
          <p><strong>Name:</strong> {selectedNote.name}</p>
          <p><strong>Class:</strong> {selectedNote.class}</p>
          <p><strong>Type:</strong> {selectedNote.type}</p>
          <p><strong>Materials:</strong> {selectedNote.materials ? <a href={selectedNote.materials}>Link</a> : "N/A"}</p>
          <p><strong>Created:</strong> {selectedNote.created}</p>
        </div>
      </DialogDescription>
      <DialogFooter>
        <Button
          onClick={closeDialog}
          className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-md"
        >
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)}
    </div>
  );
}
