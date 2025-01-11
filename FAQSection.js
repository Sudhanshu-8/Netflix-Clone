import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

// Get screen width
const { width } = Dimensions.get('window');

const FAQSection = () => {
  const [showDescriptionFirst, setShowDescriptionFirst] = useState(false); // State for the first FAQ box
  const [showDescriptionSecond, setShowDescriptionSecond] = useState(false); // State for the second FAQ box

  const toggleDescriptionFirst = () => {
    setShowDescriptionFirst(!showDescriptionFirst); // Toggle first FAQ box description
  };

  const toggleDescriptionSecond = () => {
    setShowDescriptionSecond(!showDescriptionSecond); // Toggle second FAQ box description
  };

  return (
    <View style={styles.container}>
      {/* FAQ Title */}
      <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
      
      {/* First FAQ Box */}
      <View style={styles.faqSection}>
        <View style={styles.faqQuestionContainer}>
          <Text style={styles.faqQuestion}>What is QuadB Tech?</Text>
          <TouchableOpacity onPress={toggleDescriptionFirst} style={styles.faqToggleButton}>
            <Text style={styles.faqToggleText}>+</Text>
          </TouchableOpacity>
        </View>

        {showDescriptionFirst && (
          <Text style={styles.faqAnswer}>
            QuadB Tech is an innovative tech company specializing in providing cutting-edge solutions
            for various industries. We focus on developing advanced technologies and providing high-quality
            services to our clients.
          </Text>
        )}
      </View>

      {/* Second FAQ Box */}
      <View style={styles.faqSection}>
        <View style={styles.faqQuestionContainer}>
          <Text style={styles.faqQuestion}>Why are we the best?</Text>
          <TouchableOpacity onPress={toggleDescriptionSecond} style={styles.faqToggleButton}>
            <Text style={styles.faqToggleText}>+</Text>
          </TouchableOpacity>
        </View>

        {showDescriptionSecond && (
          <Text style={styles.faqAnswer}>
            QuadB Tech stands out due to our innovative approach and expertise in delivering state-of-the-art solutions to our clients.
          </Text>
        )}
      </View>

      {/* Additional Text after FAQ Section */}
      <Text style={styles.questionsText}>Questions? 220-220-330-4400</Text>

      {/* Added Space */}
      <View style={styles.space} />

      {/* Underlined Links */}
      <View style={[styles.linkContainer, { flexDirection: width > 600 ? 'row' : 'column' }]}>
        <Text style={styles.link}>FAQ</Text>
        <Text style={styles.link}>Help Center</Text>
        <Text style={styles.link}>Contact Us</Text>
      </View>

      {/* Space */}
      <View style={styles.space} />

      {/* QuadB Tech */}
      <Text style={styles.quadBTechText}>QuadB Tech</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  faqTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d3d3d3', // Light grey color
    marginBottom: 15,
  },
  faqSection: {
    backgroundColor: '#1c1c1c',
    borderRadius: 10, // Rounded corners for the box
    padding: 15,
    marginBottom: 10,
  },
  faqQuestionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d3d3d3', // Light grey color
  },
  faqToggleButton: {
    padding: 5,
  },
  faqToggleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d3d3d3', // Light grey color
  },
  faqAnswer: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 5,
  },
  questionsText: {
    fontSize: 14,
    color: '#d3d3d3', // Light grey color
    marginTop: 15,
  },
  linkContainer: {
    marginTop: 10,
    justifyContent: 'space-between', // Evenly space links
  },
  link: {
    fontSize: 14,
    color: '#d3d3d3', // Light grey color
    textDecorationLine: 'underline',
    marginBottom: 5, // Added margin between links
  },
  space: {
    marginVertical: 20,
  },
  quadBTechText: {
    fontSize: 16,
    color: '#d3d3d3', // Light grey color
    textAlign: 'left',
    marginBottom: 30,
  },
});

export default FAQSection;
