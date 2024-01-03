// SubchaptersScreen.tsx
import React from "react";
import { ScrollView } from 'react-native';
import SubchapterRows from "./SubchapterRows";
import { subchapters } from "./subchaptersTitle"; // Assume this is your data file

export interface Subchapter {
  id: number;
  isLocked: boolean;
}

const SubchaptersScreen: React.FC = () => {
  return (
    <ScrollView>
      <SubchapterRows subchapters={subchapters} />
    </ScrollView>
  );
};

export default SubchaptersScreen;

