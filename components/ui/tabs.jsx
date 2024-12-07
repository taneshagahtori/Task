"use clients"
import * as React from "react";

const Tabs = ({ children, defaultValue, className, ...props }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(defaultValue || 0);

  const context = { selectedIndex, setSelectedIndex };
  return (
    <div className={`tabs-container ${className}`} {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { context })
      )}
    </div>
  );
};

const TabList = ({ children, context, className, ...props }) => {
  return (
    <div className={`tab-list flex ${className}`} {...props}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          context,
          index,
        })
      )}
    </div>
  );
};

const Tab = ({ children, context, index, className, ...props }) => {
  const { selectedIndex, setSelectedIndex } = context;
  const isActive = selectedIndex === index;

  return (
    <button
      className={`tab px-4 py-2 rounded ${
        isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
      } ${className}`}
      onClick={() => setSelectedIndex(index)}
      {...props}
    >
      {children}
    </button>
  );
};

const TabPanels = ({ children, context, className, ...props }) => {
  return (
    <div className={`tab-panels ${className}`} {...props}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, { context, index })
      )}
    </div>
  );
};

const TabPanel = ({ children, context, index, className, ...props }) => {
  const { selectedIndex } = context;
  return selectedIndex === index ? (
    <div className={`tab-panel ${className}`} {...props}>
      {children}
    </div>
  ) : null;
};

export { Tabs, TabList, Tab, TabPanels, TabPanel };
