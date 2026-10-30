require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const QuizQuestion = require('./models/QuizQuestion');
const InterviewQuestion = require('./models/InterviewQuestion');
const CodingProblem = require('./models/CodingProblem');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/placement_portal';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clean existing data
    await User.deleteMany({});
    await QuizQuestion.deleteMany({});
    await InterviewQuestion.deleteMany({});
    await CodingProblem.deleteMany({});
    console.log('Cleared existing collections.');

    // 1. Seed Demo User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    const demoUser = await User.create({
      name: 'S.Uzaif Ahamed',
      email: 'demo@placement.com',
      password: hashedPassword,
      college: 'College of Engineering & Technology',
      graduationYear: '2026'
    });
    console.log('Created demo user: demo@placement.com / password123');

    // 2. Seed Coding Problems
    const problems = await CodingProblem.insertMany([
      {
        title: 'Two Sum',
        category: 'Arrays',
        difficulty: 'Easy',
        companies: ['Amazon', 'Google', 'Microsoft'],
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        hint: 'Use a Hash Map to store previously visited elements and their indices for O(n) lookup.',
        sampleInput: 'nums = [2,7,11,15], target = 9',
        sampleOutput: '[0,1]',
        solutionCode: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}'
      },
      {
        title: "Maximum Subarray (Kadane's Algorithm)",
        category: 'Arrays',
        difficulty: 'Medium',
        companies: ['Amazon', 'Microsoft', 'TCS Digital'],
        description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
        hint: 'Maintain currentSum and maxSum. If currentSum drops below 0, reset it to 0.',
        sampleInput: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        sampleOutput: '6',
        solutionCode: 'function maxSubArray(nums) {\n  let currentSum = 0;\n  let maxSum = nums[0];\n  for (const num of nums) {\n    currentSum += num;\n    maxSum = Math.max(maxSum, currentSum);\n    if (currentSum < 0) currentSum = 0;\n  }\n  return maxSum;\n}'
      },
      {
        title: 'Longest Substring Without Repeating Characters',
        category: 'Strings',
        difficulty: 'Medium',
        companies: ['Amazon', 'Google', 'Microsoft'],
        description: 'Given a string s, find the length of the longest substring without repeating characters.',
        hint: 'Use the sliding window technique with a Set.',
        sampleInput: 's = "abcabcbb"',
        sampleOutput: '3',
        solutionCode: 'function lengthOfLongestSubstring(s) {\n  let set = new Set();\n  let left = 0, maxLength = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (set.has(s[right])) {\n      set.delete(s[left]);\n      left++;\n    }\n    set.add(s[right]);\n    maxLength = Math.max(maxLength, right - left + 1);\n  }\n  return maxLength;\n}'
      },
      {
        title: 'Reverse a Linked List',
        category: 'Linked Lists',
        difficulty: 'Easy',
        companies: ['Amazon', 'Microsoft', 'Infosys'],
        description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
        hint: 'Use three pointers: prev, curr, and next.',
        sampleInput: 'head = [1,2,3,4,5]',
        sampleOutput: '[5,4,3,2,1]',
        solutionCode: 'function reverseList(head) {\n  let prev = null, curr = head;\n  while (curr !== null) {\n    let next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}'
      },
      {
        title: 'Binary Tree Level Order Traversal',
        category: 'Trees',
        difficulty: 'Medium',
        companies: ['Amazon', 'Google', 'Microsoft'],
        description: "Given the root of a binary tree, return the level order traversal of its nodes' values.",
        hint: 'Use a Queue for Breadth-First Search (BFS).',
        sampleInput: 'root = [3,9,20,null,null,15,7]',
        sampleOutput: '[[3],[9,20],[15,7]]',
        solutionCode: 'function levelOrder(root) {\n  if (!root) return [];\n  const result = [];\n  const queue = [root];\n  while (queue.length > 0) {\n    const size = queue.length;\n    const level = [];\n    for (let i = 0; i < size; i++) {\n      const node = queue.shift();\n      level.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    result.push(level);\n  }\n  return result;\n}'
      }
    ]);
    console.log(`Seeded ${problems.length} coding problems.`);

    // 3. Seed Quiz Questions
    const quizQuestions = await QuizQuestion.insertMany([
      {
        category: 'Quantitative Aptitude',
        question: 'A train running at 54 km/hr takes 20 seconds to cross a platform 150 meters long. What is the length of the train?',
        options: ['100 meters', '150 meters', '200 meters', '250 meters'],
        correctIndex: 1,
        explanation: 'Speed = 54 * (5/18) = 15 m/s. Total distance in 20s = 15 * 20 = 300m. Train length = 300 - 150 = 150m.'
      },
      {
        category: 'Logical Reasoning',
        question: 'If "CODING" is coded as "DPEJOH", what is the code for "CAMPUS"?',
        options: ['DBNQVT', 'EBNQVT', 'DANRVT', 'DBMRVT'],
        correctIndex: 0,
        explanation: 'Each letter is shifted by +1: C->D, A->B, M->N, P->Q, U->V, S->T. Result = DBNQVT.'
      },
      {
        category: 'Technical',
        question: 'Which normal form eliminates transitive functional dependencies?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctIndex: 2,
        explanation: '3NF removes transitive dependencies where a non-prime attribute depends on another non-prime attribute.'
      },
      {
        category: 'Technical',
        question: 'Which protocol is connection-oriented and guarantees ordered byte delivery at the Transport layer?',
        options: ['UDP', 'IP', 'TCP', 'ICMP'],
        correctIndex: 2,
        explanation: 'TCP (Transmission Control Protocol) is connection-oriented and ensures reliability and ordering.'
      }
    ]);
    console.log(`Seeded ${quizQuestions.length} quiz questions.`);

    // 4. Seed Interview Questions
    const interviewQuestions = await InterviewQuestion.insertMany([
      {
        title: 'Tell me about yourself.',
        category: 'HR',
        difficulty: 'Easy',
        strategy: 'Use the Present -> Past -> Future format. Highlight key technical projects and alignment with the company.',
        answer: 'I am a final-year CS student with a strong foundation in MERN stack development and data structures. Recently, I built a Campus Placement Preparation Portal with JWT authentication and analytics. I am passionate about scalable web architecture and eager to contribute to your engineering team.',
        tags: ['Introduction', 'Behavioral']
      },
      {
        title: 'Explain ACID Properties in DBMS with an example.',
        category: 'DBMS',
        difficulty: 'Medium',
        strategy: 'Explain Atomicity, Consistency, Isolation, and Durability using a bank transaction example.',
        answer: 'Atomicity ensures all-or-nothing execution. Consistency preserves integrity constraints before and after execution. Isolation guarantees concurrent transactions execute without conflict. Durability guarantees committed data persists even during hardware failure.',
        tags: ['Transactions', 'ACID', 'SQL']
      },
      {
        title: 'What are the 4 Coffman conditions for Deadlock?',
        category: 'Operating Systems',
        difficulty: 'Medium',
        strategy: 'List and explain Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.',
        answer: '1. Mutual Exclusion (non-shareable resources). 2. Hold and Wait (process holds resources while waiting for more). 3. No Preemption (resources cannot be forcibly taken). 4. Circular Wait (circular chain of waiting processes).',
        tags: ['Concurrency', 'Deadlocks']
      }
    ]);
    console.log(`Seeded ${interviewQuestions.length} interview questions.`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
