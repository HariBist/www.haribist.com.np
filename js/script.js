document.addEventListener('DOMContentLoaded', () => {
            // Navigation Mobile Menu Toggle
            const hamburger = document.getElementById('hamburger');
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            const navLinks = document.querySelectorAll('.nav-item');

            function toggleMobileMenu() {
                hamburger.classList.toggle('active');
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
                document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
            }

            hamburger.addEventListener('click', toggleMobileMenu);
            overlay.addEventListener('click', toggleMobileMenu);

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (sidebar.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                });
            });

            // Scroll-Spy for Active Navigation Items
            const sections = document.querySelectorAll('section');
            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    if (pageYOffset >= sectionTop) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });

            // Project Filtering System
            const filterBtns = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const filter = btn.getAttribute('data-filter');

                    projectCards.forEach(card => {
                        if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });

            // Project Modal Data & Interactivity
            const modalData = {
                p1: {
                    title: "Small Enterprise Network Design",
                    objective: "Configure a scalable enterprise network with distinct VLANs, Inter-VLAN routing, and outbound NAT internet access.",
                    topology: "Core Router <--> Distribution Switch <--> Access Switches (VLAN 10, 20, 30)",
                    configs: `Switch(config)# vlan 10\nSwitch(config-vlan)# name Sales\nSwitch(config)# interface FastEthernet0/1\nSwitch(config-if)# switchport mode access\nSwitch(config-if)# switchport access vlan 10\nRouter(config)# interface g0/0.10\nRouter(config-subif)# encapsulation dot1Q 10\nRouter(config-subif)# ip address 192.168.10.1 255.255.255.0`,
                    troubleshooting: "Verified trunking encapsulate dot1Q commands on switch uplinks and checked IP default gateways across hosts."
                },
                p2: {
                    title: "Multi-Router OSPF Network Topology",
                    objective: "Establish dynamic routing across 3 core routers using OSPF Area 0.",
                    topology: "Router-1 (Area 0) <--> Router-2 (Area 0) <--> Router-3 (Area 0)",
                    configs: `Router(config)# router ospf 1\nRouter(config-router)# network 10.0.0.0 0.0.0.3 area 0\nRouter(config-router)# network 192.168.1.0 0.0.255.255 area 0`,
                    troubleshooting: "Executed 'show ip ospf neighbor' to confirm adjacency states and verified wildcard masks."
                },
                p3: {
                    title: "Network Security & Hardening Lab",
                    objective: "Prevent unauthorized switchport access and rogue DHCP servers.",
                    topology: "Core Switch connected to user endpoints and DHCP server.",
                    configs: `Switch(config-if)# switchport port-security\nSwitch(config-if)# switchport port-security maximum 2\nSwitch(config-if)# switchport port-security violation shutdown\nSwitch(config)# ip dhcp snooping`,
                    troubleshooting: "Tested port shutdown on MAC address violation and verified DHCP snooping trusted interfaces."
                },
                p4: {
                    title: "Wireshark Traffic Analysis",
                    objective: "Capture network packets to troubleshoot protocol communication.",
                    topology: "Host PC running Wireshark capturing traffic to local gateway.",
                    configs: `Filter: tcp.flags.syn == 1 and tcp.flags.ack == 0\nFilter: dns || dhcp`,
                    troubleshooting: "Analyzed delta time between ACK packets to isolate network latency bottlenecks."
                }
            };

            const modal = document.getElementById('projectModal');
            const modalBody = document.getElementById('modalBody');
            const modalClose = document.getElementById('modalClose');
            const modalBtns = document.querySelectorAll('.btn-modal');

            modalBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const projectId = btn.getAttribute('data-project');
                    const data = modalData[projectId];

                    modalBody.innerHTML = `
                        <h3 style="font-size:1.4rem; color:var(--text-primary);">${data.title}</h3>
                        <h4>Objective</h4>
                        <p style="color:var(--text-secondary); font-size:0.95rem;">${data.objective}</p>
                        <h4>Topology Setup</h4>
                        <p style="color:var(--text-secondary); font-size:0.95rem;">${data.topology}</p>
                        <h4>Configuration Snippet</h4>
                        <div class="code-block"><pre>${data.configs}</pre></div>
                        <h4>Troubleshooting Process</h4>
                        <p style="color:var(--text-secondary); font-size:0.95rem;">${data.troubleshooting}</p>
                    `;
                    modal.classList.add('active');
                });
            });

            modalClose.addEventListener('click', () => {
                modal.classList.remove('active');
            });

            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });

            // Contact Form Validation
            const contactForm = document.getElementById('contactForm');
            const formAlert = document.getElementById('formAlert');

            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                formAlert.style.display = 'block';
            });
        });
