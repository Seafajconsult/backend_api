import { PrismaClient } from '@prisma/client';
import { UserRole, UserStatus } from '../src/prisma/types';
import * as bcrypt from 'bcrypt';
import { SUPER_ADMIN_DEFAULTS } from '../src/config/constants';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🌱 Starting database seeding...');

    // Check if super admin already exists
    const existingSuperAdmin = await prisma.user.findUnique({
      where: { email: SUPER_ADMIN_DEFAULTS.EMAIL },
    });

    if (!existingSuperAdmin) {
      // Create Super Admin
      const hashedPassword = await bcrypt.hash(SUPER_ADMIN_DEFAULTS.PASSWORD, 12);

      const superAdminUser = await prisma.user.create({
        data: {
          email: SUPER_ADMIN_DEFAULTS.EMAIL,
          password: hashedPassword,
          role: UserRole.SUPER_ADMIN,
          status: UserStatus.ACTIVE,
          superAdmin: {
            create: {
              firstName: SUPER_ADMIN_DEFAULTS.FIRST_NAME,
              lastName: SUPER_ADMIN_DEFAULTS.LAST_NAME
            }
          }
        }
      });

      console.log('✅ Super Admin created:', superAdminUser.email);
    } else {
      console.log('ℹ️ Super Admin already exists');
    }

    // Create default Admin Roles (can be used when creating new admins)
    const adminRoles = [
      {
        name: 'student_management',
        description: 'Manages student applications and visa processing'
      },
      {
        name: 'employer_management',
        description: 'Manages employer verification and recruitment requests'
      },
      {
        name: 'content_management',
        description: 'Manages testimonials and documentation'
      }
    ];

    // Example Subscription Plans for Employers
    const subscriptionPlans = [
      {
        name: 'Basic',
        price: 50000, // in Naira
        features: [
          'Up to 5 job postings',
          'Basic candidate filtering',
          'Email support'
        ]
      },
      {
        name: 'Professional',
        price: 100000,
        features: [
          'Up to 15 job postings',
          'Advanced candidate filtering',
          'Priority support',
          'Featured listings'
        ]
      },
      {
        name: 'Enterprise',
        price: 200000,
        features: [
          'Unlimited job postings',
          'Custom recruitment solutions',
          'Dedicated account manager',
          'API access'
        ]
      }
    ];

    // Student Application Progress Steps
    const applicationSteps = [
      {
        order: 1,
        name: 'Registration',
        description: 'Complete profile and basic information'
      },
      {
        order: 2,
        name: 'Document Submission',
        description: 'Upload required documents including transcripts and passport'
      },
      {
        order: 3,
        name: 'University Application',
        description: 'Apply to selected universities'
      },
      {
        order: 4,
        name: 'Offer Acceptance',
        description: 'Review and accept university offers'
      },
      {
        order: 5,
        name: 'Visa Application',
        description: 'Prepare and submit visa application'
      },
      {
        order: 6,
        name: 'Pre-Departure',
        description: 'Complete pre-departure briefing and arrangements'
      }
    ];

    // Add sample data for development (optional)
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Adding development sample data...');

      // Create sample student
      const studentEmail = 'student@example.com';
      const existingStudent = await prisma.user.findUnique({
        where: { email: studentEmail },
      });

      if (!existingStudent) {
        const hashedPassword = await bcrypt.hash('Student123!', 12);
        const applicationId = `SEA-${Math.floor(100000 + Math.random() * 900000)}`;

        await prisma.user.create({
          data: {
            email: studentEmail,
            password: hashedPassword,
            role: UserRole.STUDENT,
            status: UserStatus.ACTIVE,
            student: {
              create: {
                applicationId,
                firstName: 'John',
                lastName: 'Doe',
                dateOfBirth: new Date('1995-01-01'),
                nationality: 'Nigerian',
                phone: '+2348012345678',
                address: '123 Main Street, Lagos, Nigeria',
                currentEducation: 'Bachelor of Science in Computer Science',
                referralCode: 'JOHN123',
              },
            },
          },
        });

        console.log('✅ Sample student created:', studentEmail);
      }

      // Create sample employer
      const employerEmail = 'employer@example.com';
      const existingEmployer = await prisma.user.findUnique({
        where: { email: employerEmail },
      });

      if (!existingEmployer) {
        const hashedPassword = await bcrypt.hash('Employer123!', 12);

        await prisma.user.create({
          data: {
            email: employerEmail,
            password: hashedPassword,
            role: UserRole.EMPLOYER,
            status: UserStatus.PENDING, // Employers need approval
            employer: {
              create: {
                companyName: 'Tech Solutions Ltd',
                registrationNumber: 'RC123456',
                companySize: 50,
                industry: 'Technology',
                website: 'https://techsolutions.com',
                address: '456 Business District, Lagos, Nigeria',
                phone: '+2348012345679',
              },
            },
          },
        });

        console.log('✅ Sample employer created:', employerEmail);
      }

      // Create sample admin
      const adminEmail = 'admin.user@sea-faj.com';
      const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
      });

      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('Admin123!', 12);

        await prisma.user.create({
          data: {
            email: adminEmail,
            password: hashedPassword,
            role: UserRole.ADMIN,
            status: UserStatus.ACTIVE,
            admin: {
              create: {
                firstName: 'Jane',
                lastName: 'Smith',
                department: 'Student Management',
                assignedRole: 'student_management',
              },
            },
          },
        });

        console.log('✅ Sample admin created:', adminEmail);
      }
    }

    console.log('🎉 Database seeding completed!');
    console.log('\n📋 Default Credentials:');
    console.log(`Super Admin: ${SUPER_ADMIN_DEFAULTS.EMAIL} / ${SUPER_ADMIN_DEFAULTS.PASSWORD}`);

    if (process.env.NODE_ENV === 'development') {
      console.log('Student: student@example.com / Student123!');
      console.log('Employer: employer@example.com / Employer123!');
      console.log('Admin: admin.user@sea-faj.com / Admin123!');
    }

    // Log the unused variables to avoid warnings (they're for reference)
    console.log(`\n📝 Reference data structures created (${adminRoles.length} admin roles, ${subscriptionPlans.length} subscription plans, ${applicationSteps.length} application steps)`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
