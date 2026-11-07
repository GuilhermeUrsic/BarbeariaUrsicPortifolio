
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];

    // Constante de autorização de Administrador único
    const ADMIN_EMAIL = 'adm@adm.com';

    function isCurrentAdmin() {
      return (currentUser && currentUser.email && currentUser.email.toLowerCase() === ADMIN_EMAIL) || isAdminLoggedIn;
    }

    // Catálogo de Produtos
    const PRODUCTS_DATA = [
      { id: 1, cat: 'cabelo', name: 'Pomada Matte Clay Efeito Seco', price: 54.90, desc: 'Fixação forte e acabamento fosco natural sem brilho.', img: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=400&q=80' },
      { id: 2, cat: 'cabelo', name: 'Pomada Modeladora Efeito Brilho Clássico', price: 49.90, desc: 'Base de água ideal para penteados clássicos tipo pompadour.', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80' },
      { id: 3, cat: 'barba', name: 'Óleo Hidratante para Barba Premium 30ml', price: 59.90, desc: 'Com óleo de argan e jojoba para maciez profunda dos fios.', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80' },
      { id: 4, cat: 'barba', name: 'Balm Multifuncional Alinhador 100g', price: 48.00, desc: 'Acalma a pele, reduz coceiras e disciplina os pelos rebeldes.', img: 'https://images.unsplash.com/photo-1608248597359-2e06180630ba?auto=format&fit=crop&w=400&q=80' },
      { id: 5, cat: 'shaving', name: 'Shaving Gel Refrescante Transparente 300g', price: 39.90, desc: 'Facilita o deslizar da lâmina garantindo visibilidade total.', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80' },
      { id: 6, cat: 'cabelo', name: 'Shampoo Mentolado Antiqueda Ursic 250ml', price: 44.00, desc: 'Estimula a microcirculação do couro cabeludo com frescor.', img: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80' },
      { id: 7, cat: 'barba', name: 'Shampoo Específico para Barba 140ml', price: 42.00, desc: 'Limpeza profunda sem ressecar a pele sensível do rosto.', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80' },
      { id: 8, cat: 'shaving', name: 'Loção Pós-Barba Calmant com Aloe Vera', price: 46.50, desc: 'Cicatriza microcortes e fecha os poros imediatamente.', img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80' },
      { id: 9, cat: 'cabelo', name: 'Pó Modelador de Volume Texturizador', price: 38.00, desc: 'Adiciona densidade e estrutura aos cabelos finos na raiz.', img: 'https://images.unsplash.com/photo-1512290900672-1f41d08779b5?auto=format&fit=crop&w=400&q=80' },
      { id: 10, cat: 'barba', name: 'Pente de Madeira Anti-estático para Barba', price: 29.90, desc: 'Alinha sem quebrar e remove o frizz dos fios faciais.', img: 'https://images.unsplash.com/photo-1590159763121-7c9ff3149e0a?auto=format&fit=crop&w=400&q=80' }
    ];

    // Serviços Oferecidos
    const SERVICES_DATA = [
      { id: 's1', name: 'Corte Masculino Premium', price: 55, desc: 'Consultoria de visagismo, lavagem com shampoo revigorante e finalização.', time: '40 min' },
      { id: 's2', name: 'Barboterapia Ursic com Vapor', price: 45, desc: 'Toalhas quentes, ozônio emoliente, lâmina descartável e massagem.', time: '35 min' },
      { id: 's3', name: 'Combo Completo (Cabelo + Barba)', price: 90, desc: 'O ritual clássico completo com direito a café espresso cortesia.', time: '1h 10 min' },
      { id: 's4', name: 'Corte Infantil Especializado', price: 50, desc: 'Paciência, técnica e ambiente amigável para os pequenos.', time: '35 min' },
      { id: 's5', name: 'Camuflagem de Cabelo / Barba', price: 45, desc: 'Tonalização rápida dos fios brancos com aspecto 100% natural.', time: '25 min' },
      { id: 's6', name: 'Design de Sobrancelha Masculina', price: 25, desc: 'Alinhamento limpo preservando a masculinidade das feições.', time: '15 min' }
    ];

    // Horários fixos para agendamento
    const DEFAULT_TIME_SLOTS = [
      '09:00', '09:45', '10:30', '11:15', '13:30', '14:15', '15:00', '15:45', '16:30', '17:15', '18:00', '18:45', '19:30'
    ];

    // Feriados Nacionais Brasileiros Recorrentes (MM-DD)
    const NATIONAL_HOLIDAYS = [
      { date: '01-01', name: 'Ano Novo (Confraternização Universal)' },
      { date: '04-21', name: 'Tiradentes' },
      { date: '05-01', name: 'Dia do Trabalhador' },
      { date: '09-07', name: 'Independência do Brasil' },
      { date: '10-12', name: 'Nossa Senhora Aparecida' },
      { date: '11-02', name: 'Finados' },
      { date: '11-15', name: 'Proclamação da República' },
      { date: '11-20', name: 'Dia da Consciência Negra' },
      { date: '12-25', name: 'Natal' }
    ];

    // Estado da Aplicação em LocalStorage
    let currentUser = null;
    let registeredUsers = [];
    let savedAppointments = [];
    let cart = [];
    let isAdminLoggedIn = false;

    // Regras de Expediente ADM
    let adminSettings = {
      closeOnHolidays: true,
      closedDates: [
        { date: '2025-12-24', reason: 'Véspera de Natal' },
        { date: '2025-12-31', reason: 'Véspera de Ano Novo' }
      ],
      barberAbsences: [
        { barber: 'Lucas Prado (Fade Specialist)', date: '2025-05-20', reason: 'Treinamento Técnico em SP' }
      ]
    };

    try {
      const u = localStorage.getItem('ursic_current_user');
      if (u) currentUser = JSON.parse(u);

      const dbUsers = localStorage.getItem('ursic_users_db');
      if (dbUsers) registeredUsers = JSON.parse(dbUsers);
      else {
        registeredUsers = [
          { id: 1, name: 'Administrador Ursic', email: 'adm@adm.com', phone: '(41) 99999-9999', pass: '12345', style: 'Corte Clássico na Tesoura' }
        ];
        try { localStorage.setItem('ursic_users_db', JSON.stringify(registeredUsers)); } catch(e) {}
      }

      // Garante que o usuário adm@adm.com exista no banco se não estiver presente
      if (!registeredUsers.some(u => u.email.toLowerCase() === ADMIN_EMAIL)) {
        registeredUsers.push({ id: 1, name: 'Administrador Ursic', email: 'adm@adm.com', phone: '(41) 99999-9999', pass: '12345', style: 'Corte Clássico na Tesoura' });
        try { localStorage.setItem('ursic_users_db', JSON.stringify(registeredUsers)); } catch(e) {}
      }

      const dbAppts = localStorage.getItem('ursic_appointments_db');
      if (dbAppts) savedAppointments = JSON.parse(dbAppts);
      else {
        savedAppointments = [
          { id: 101, clientName: 'Gabriel Albuquerque', phone: '(41) 98888-7777', service: 'Corte Masculino Premium', barber: 'Matheus Ursic (Master Barber)', date: '2025-05-15', time: '14:15', status: 'Confirmado', notes: 'Fade navalhado' }
        ];
      }

      const c = localStorage.getItem('ursic_cart');
      if (c) cart = JSON.parse(c);

      const admS = localStorage.getItem('ursic_admin_settings');
      if (admS) adminSettings = JSON.parse(admS);

      const admSess = sessionStorage.getItem('ursic_admin_session');
      if (admSess === 'true') isAdminLoggedIn = true;
    } catch(e) {}

    // Toast
    function showToast(msg) {
      const toast = $('#toast');
      if (!toast) return;
      toast.innerText = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2800);
    }

    // Helper: Salvar configurações ADM
    function saveAdminSettings() {
      try {
        localStorage.setItem('ursic_admin_settings', JSON.stringify(adminSettings));
      } catch(e) {}
    }

    // Atualiza visibilidade dos acessos ADM (Apenas para adm@adm.com)
    function updateAdminAccessVisibility() {
      const hasAdmAccess = isCurrentAdmin();
      const adminNavLi = $('#adminNavLi');
      const adminHeaderBtn = $('#adminHeaderBtn');
      const footerAdminLi = $('#footerAdminLi');
      const btnGoToAdminProfile = $('#btnGoToAdminFromProfile');

      if (adminNavLi) adminNavLi.style.display = hasAdmAccess ? 'block' : 'none';
      if (adminHeaderBtn) adminHeaderBtn.style.display = hasAdmAccess ? 'inline-flex' : 'none';
      if (footerAdminLi) footerAdminLi.style.display = hasAdmAccess ? 'block' : 'none';
      if (btnGoToAdminProfile) btnGoToAdminProfile.style.display = (currentUser && currentUser.email && currentUser.email.toLowerCase() === ADMIN_EMAIL) ? 'block' : 'none';
    }

    // 1. Navegação SPA
    function initNavigation() {
      try {
        const pages = $$('section[data-page]');
        const mainMenu = $('#mainMenu');

        function switchPage(pageId) {
          if (!pageId) pageId = 'home';
          pages.forEach(p => p.classList.toggle('active-page', p.dataset.page === pageId));
          $$('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.nav === pageId);
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (mainMenu) mainMenu.classList.remove('mobile-open');

          if (pageId === 'admin') {
            renderAdminDashboard();
          }
        }

        document.addEventListener('click', (e) => {
          const target = e.target.closest('[data-nav]');
          if (target) {
            e.preventDefault();
            const pageId = target.getAttribute('data-nav');
            window.location.hash = pageId;
            switchPage(pageId);
          }
        });

        window.addEventListener('hashchange', () => {
          const hash = window.location.hash.replace('#', '');
          if (hash) switchPage(hash);
        });

        if (window.location.hash) {
          switchPage(window.location.hash.replace('#', ''));
        }

        const mobileBtn = $('#mobileMenuBtn');
        if (mobileBtn && mainMenu) {
          mobileBtn.addEventListener('click', () => {
            mainMenu.classList.toggle('mobile-open');
          });
        }
      } catch(e) {}
    }

    // 2. Sistema de Criação de Usuário e Autenticação
    function initUserSystem() {
      try {
        const authModal = $('#authModal');
        const authBtn = $('#authBtn');
        const authCloseBtn = $('#authCloseBtn');
        const tabReg = $('#tabRegisterBtn');
        const tabLog = $('#tabLoginBtn');
        const regForm = $('#registerForm');
        const logForm = $('#loginForm');
        const loggedView = $('#userLoggedView');
        const authTabs = $('#authTabGroup');
        const authTitle = $('#authModalTitle');
        const navName = $('#navUserName');
        const userIcon = $('#userIconDisplay');
        const openFromBookNotice = $('#openAuthFromBooking');

        function updateAuthHeaderUI() {
          if (currentUser) {
            if (navName) navName.innerText = currentUser.name.split(' ')[0];
            if (userIcon) userIcon.innerText = (currentUser.email && currentUser.email.toLowerCase() === ADMIN_EMAIL) ? '👑' : '✅';
            const nameInput = $('#obClientName');
            const phoneInput = $('#obClientPhone');
            if (nameInput && !nameInput.value) nameInput.value = currentUser.name;
            if (phoneInput && !phoneInput.value) phoneInput.value = currentUser.phone;
          } else {
            if (navName) navName.innerText = 'Entrar / Criar Conta';
            if (userIcon) userIcon.innerText = '👤';
          }
          updateAdminAccessVisibility();
        }

        function showRegisterTab() {
          tabReg.classList.add('active');
          tabLog.classList.remove('active');
          regForm.style.display = 'block';
          logForm.style.display = 'none';
          loggedView.style.display = 'none';
          authTabs.style.display = 'flex';
          authTitle.innerText = 'Criar Nova Conta';
        }

        function showLoginTab() {
          tabLog.classList.add('active');
          tabReg.classList.remove('active');
          regForm.style.display = 'none';
          logForm.style.display = 'block';
          loggedView.style.display = 'none';
          authTabs.style.display = 'flex';
          authTitle.innerText = 'Entrar na Sua Conta';
        }

        function showLoggedView() {
          authTabs.style.display = 'none';
          regForm.style.display = 'none';
          logForm.style.display = 'none';
          loggedView.style.display = 'block';
          authTitle.innerText = 'Meu Painel do Cliente';

          $('#loggedUserName').innerText = currentUser.name;
          $('#loggedUserEmail').innerText = currentUser.email;
          $('#loggedUserPhone').innerText = currentUser.phone;
          $('#loggedUserStyle').innerText = `Estilo: ${currentUser.style || 'Não informado'}`;
          updateAdminAccessVisibility();
        }

        function openModal() {
          authModal.classList.add('open');
          if (currentUser) showLoggedView();
          else showRegisterTab();
        }

        function closeModal() {
          authModal.classList.remove('open');
        }

        authBtn?.addEventListener('click', openModal);
        openFromBookNotice?.addEventListener('click', openModal);
        authCloseBtn?.addEventListener('click', closeModal);
        authModal?.addEventListener('click', (e) => { if (e.target === authModal) closeModal(); });

        tabReg?.addEventListener('click', showRegisterTab);
        tabLog?.addEventListener('click', showLoginTab);

        regForm?.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = $('#regName').value.trim();
          const email = $('#regEmail').value.trim().toLowerCase();
          const phone = $('#regPhone').value.trim();
          const pass = $('#regPass').value;
          const style = $('#regStyle').value;

          const exists = registeredUsers.find(u => u.email === email);
          if (exists) {
            alert('Este e-mail já possui cadastro. Use a aba "Já Tenho Conta" para entrar.');
            showLoginTab();
            $('#loginEmail').value = email;
            return;
          }

          const newUser = { id: Date.now(), name, email, phone, pass, style };
          registeredUsers.push(newUser);
          currentUser = newUser;

          try {
            localStorage.setItem('ursic_users_db', JSON.stringify(registeredUsers));
            localStorage.setItem('ursic_current_user', JSON.stringify(currentUser));
          } catch(err) {}

          updateAuthHeaderUI();
          showToast(`Conta criada com sucesso! Bem-vindo, ${name.split(' ')[0]}!`);
          showLoggedView();
          regForm.reset();
        });

        logForm?.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = $('#loginEmail').value.trim().toLowerCase();
          const pass = $('#loginPass').value;

          const user = registeredUsers.find(u => u.email === email && u.pass === pass);
          if (!user) {
            alert('E-mail ou senha incorretos. Caso ainda não tenha conta, clique em "Criar Minha Conta".');
            return;
          }

          currentUser = user;
          try {
            localStorage.setItem('ursic_current_user', JSON.stringify(currentUser));
          } catch(err) {}

          if (user.email.toLowerCase() === ADMIN_EMAIL) {
            isAdminLoggedIn = true;
            try { sessionStorage.setItem('ursic_admin_session', 'true'); } catch(err) {}
          }

          updateAuthHeaderUI();
          showToast(`Olá novamente, ${currentUser.name.split(' ')[0]}!`);
          showLoggedView();
          logForm.reset();
        });

        $('#btnLogoutUser')?.addEventListener('click', () => {
          currentUser = null;
          isAdminLoggedIn = false;
          try {
            localStorage.removeItem('ursic_current_user');
            sessionStorage.removeItem('ursic_admin_session');
          } catch(err) {}
          updateAuthHeaderUI();
          showToast('Você saiu da sua conta.');
          closeModal();
          if (window.location.hash === '#admin') {
            window.location.hash = 'home';
            $$('section[data-page]').forEach(p => p.classList.toggle('active-page', p.dataset.page === 'home'));
          }
        });

        $('#btnGoToBookingFromProfile')?.addEventListener('click', () => {
          closeModal();
          window.location.hash = 'agendamento';
          $$('section[data-page]').forEach(p => p.classList.toggle('active-page', p.dataset.page === 'agendamento'));
        });

        $('#btnGoToAdminFromProfile')?.addEventListener('click', () => {
          closeModal();
          window.location.hash = 'admin';
          $$('section[data-page]').forEach(p => p.classList.toggle('active-page', p.dataset.page === 'admin'));
        });

        updateAuthHeaderUI();
      } catch(e) {}
    }

    // 3. Sistema de Agendamento Online no Site integrado com Regras ADM
    function initOnlineBookingSystem() {
      try {
        const form = $('#onlineBookingForm');
        const dateInput = $('#obDateInput');
        const barberSelect = $('#obBarberSelect');
        const slotContainer = $('#slotPicker');
        const selectedTimeHidden = $('#obSelectedTime');
        const apptsListContainer = $('#appointmentsList');
        const countSpan = $('#appointmentsCount');
        const warningNotice = $('#bookingWarningNotice');
        const warningText = $('#bookingWarningText');
        const submitBtn = $('#obSubmitBtn');

        const todayStr = new Date().toISOString().split('T')[0];
        if (dateInput) {
          dateInput.min = todayStr;
          dateInput.value = todayStr;
        }

        // Valida se a barbearia fecha na data ou se o barbeiro está ausente
        function checkDateAvailability(dateVal, barberVal) {
          if (!dateVal) return { allowed: true };

          const mmdd = dateVal.substring(5); // 'MM-DD'
          
          // 1. Feriados Nacionais
          if (adminSettings.closeOnHolidays) {
            const hol = NATIONAL_HOLIDAYS.find(h => h.date === mmdd);
            if (hol) {
              return { allowed: false, type: 'holiday', reason: `A barbearia não abre em feriados nacionais (${hol.name}). Selecione outro dia.` };
            }
          }

          // 2. Barbearia não vai abrir (fechamento geral determinado pela ADM)
          const shopClosed = adminSettings.closedDates.find(c => c.date === dateVal);
          if (shopClosed) {
            return { allowed: false, type: 'shop_closed', reason: `A Barbearia Ursic estará fechada nesta data por motivo de: "${shopClosed.reason}". Por favor escolha outra data.` };
          }

          // 3. Domingo (Fechado oficial)
          const dayOfWeek = new Date(dateVal + 'T12:00:00').getDay();
          if (dayOfWeek === 0) {
            return { allowed: false, type: 'sunday', reason: 'Aos domingos a Barbearia Ursic permanece fechada para descanso da equipe.' };
          }

          // 4. Ausência de Barbeiro específico
          if (barberVal && barberVal !== 'Qualquer Barbeiro Disponível') {
            const absence = adminSettings.barberAbsences.find(a => a.date === dateVal && a.barber === barberVal);
            if (absence) {
              return { allowed: false, type: 'barber_absent', reason: `O profissional ${barberVal} não irá atender no dia ${dateVal.split('-').reverse().join('/')} (${absence.reason}). Por favor escolha outro barbeiro ou outra data.` };
            }
          }

          return { allowed: true };
        }

        function saveAppointmentsToStorage() {
          try {
            localStorage.setItem('ursic_appointments_db', JSON.stringify(savedAppointments));
          } catch(e) {}
          renderAppointmentsList();
          renderSlotsForSelectedDate();
          if (isAdminLoggedIn) renderAdminDashboard();
        }

        // Renderiza horários livres / ocupados para a data selecionada
        function renderSlotsForSelectedDate() {
          if (!slotContainer) return;
          const chosenDate = dateInput ? dateInput.value : todayStr;
          const chosenBarber = barberSelect ? barberSelect.value : '';

          const check = checkDateAvailability(chosenDate, chosenBarber);

          if (!check.allowed) {
            if (warningNotice && warningText) {
              warningNotice.style.display = 'block';
              warningText.innerText = check.reason;
            }
            slotContainer.innerHTML = `<p style="grid-column: 1/-1; color:#ef4444; font-size:0.85rem; padding: 0.5rem 0;">Sem horários disponíveis: ${check.reason}</p>`;
            if (submitBtn) submitBtn.disabled = true;
            selectedTimeHidden.value = '';
            return;
          } else {
            if (warningNotice) warningNotice.style.display = 'none';
            if (submitBtn) submitBtn.disabled = false;
          }

          // Horários agendados para a mesma data (e mesmo barbeiro se selecionado)
          const bookedTimes = savedAppointments
            .filter(a => a.date === chosenDate && a.status !== 'Cancelado' && (chosenBarber === 'Qualquer Barbeiro Disponível' || a.barber === chosenBarber || a.barber === 'Qualquer Barbeiro Disponível'))
            .map(a => a.time);

          slotContainer.innerHTML = DEFAULT_TIME_SLOTS.map(time => {
            const isBooked = bookedTimes.includes(time);
            return `
              <div class="slot-pill ${isBooked ? 'disabled' : ''}" data-time="${time}">
                ${time}
              </div>
            `;
          }).join('');

          selectedTimeHidden.value = '';
        }

        slotContainer?.addEventListener('click', (e) => {
          const pill = e.target.closest('.slot-pill');
          if (!pill || pill.classList.contains('disabled')) return;
          
          $$('.slot-pill', slotContainer).forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          selectedTimeHidden.value = pill.dataset.time;
        });

        dateInput?.addEventListener('change', renderSlotsForSelectedDate);
        barberSelect?.addEventListener('change', renderSlotsForSelectedDate);
        renderSlotsForSelectedDate();

        // Renderiza lista de agendamentos salvos
        function renderAppointmentsList() {
          if (!apptsListContainer) return;

          if (savedAppointments.length === 0) {
            apptsListContainer.innerHTML = `<p style="font-size:0.85rem; color:var(--text-muted); text-align:center; padding:1.5rem 0;">Nenhum agendamento ativo no momento.</p>`;
            if (countSpan) countSpan.innerText = '0 agendados';
            return;
          }

          if (countSpan) countSpan.innerText = `${savedAppointments.filter(a => a.status !== 'Cancelado').length} ativos`;

          apptsListContainer.innerHTML = savedAppointments.map(a => `
            <div class="appointment-card" data-appt-id="${a.id}">
              <div>
                <span class="status-badge ${a.status === 'Cancelado' ? 'canceled' : ''}">${a.status}</span>
                <div style="font-weight:700; font-size:0.95rem; margin-top:0.4rem;">${a.service}</div>
                <div style="font-size:0.8rem; color:var(--text-muted);">
                  📅 ${a.date.split('-').reverse().join('/')} às <strong>${a.time}</strong> • ${a.barber.split(' ')[0]}
                </div>
                <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.2rem;">Cliente: ${a.clientName}</div>
              </div>
              <div>
                ${a.status !== 'Cancelado' ? `
                  <button class="btn-danger-outline cancel-appt-btn" data-appt-id="${a.id}">Cancelar</button>
                ` : '<span style="font-size:0.75rem; color:#ef4444;">Cancelado</span>'}
              </div>
            </div>
          `).reverse().join('');
        }
        renderAppointmentsList();

        document.addEventListener('click', (e) => {
          const cancelBtn = e.target.closest('.cancel-appt-btn');
          if (cancelBtn) {
            const apptId = parseInt(cancelBtn.dataset.apptId, 10);
            if (confirm('Deseja realmente cancelar este horário? O slot será liberado no site.')) {
              const targetAppt = savedAppointments.find(a => a.id === apptId);
              if (targetAppt) {
                targetAppt.status = 'Cancelado';
                saveAppointmentsToStorage();
                showToast('Agendamento cancelado com sucesso.');
              }
            }
          }
        });

        form?.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = $('#obClientName').value.trim();
          const phone = $('#obClientPhone').value.trim();
          const service = $('#obServiceSelect').value;
          const barber = barberSelect.value;
          const date = dateInput.value;
          const time = selectedTimeHidden.value;
          const notes = $('#obNotes').value.trim();

          const check = checkDateAvailability(date, barber);
          if (!check.allowed) {
            alert(check.reason);
            return;
          }

          if (!time) {
            alert('Por favor, selecione um horário disponível na grade de horários.');
            return;
          }

          const newAppointment = {
            id: Date.now(),
            clientName: name,
            phone: phone,
            service: service,
            barber: barber,
            date: date,
            time: time,
            notes: notes,
            status: 'Confirmado',
            userId: currentUser ? currentUser.id : null,
            createdAt: new Date().toISOString()
          };

          savedAppointments.push(newAppointment);
          saveAppointmentsToStorage();

          showToast(`Horário agendado com sucesso para ${date.split('-').reverse().join('/')} às ${time}!`);
          form.reset();
          if (currentUser) {
            $('#obClientName').value = currentUser.name;
            $('#obClientPhone').value = currentUser.phone;
          }
          dateInput.value = todayStr;
          renderSlotsForSelectedDate();
        });

      } catch(e) {}
    }

    // 4. Módulo da Área Administrativa (Exclusivo para adm@adm.com)
    function initAdminSystem() {
      try {
        const adminBtn = $('#adminHeaderBtn');
        const loginWrapper = $('#adminLoginWrapper');
        const dashboardWrapper = $('#adminDashboardWrapper');
        const deniedWrapper = $('#adminAccessDeniedWrapper');
        const loginForm = $('#adminLoginForm');
        const logoutBtn = $('#btnAdminLogout');
        const holidayToggle = $('#admCloseOnHolidaysToggle');
        const addShopCloseForm = $('#admAddShopClosedForm');
        const addBarberAbsenceForm = $('#admAddBarberAbsenceForm');
        const filterDateInput = $('#admFilterDate');
        const clearFilterBtn = $('#admClearFilterDate');
        const goAuthBtn = $('#adminGoAuthBtn');

        function updateAdminView() {
          updateAdminAccessVisibility();

          // Se estiver logado como adm@adm.com
          if (currentUser && currentUser.email && currentUser.email.toLowerCase() === ADMIN_EMAIL) {
            if (deniedWrapper) deniedWrapper.style.display = 'none';
            if (loginWrapper) loginWrapper.style.display = 'none';
            if (dashboardWrapper) dashboardWrapper.style.display = 'block';
            renderAdminDashboard();
            return;
          }

          // Se sessão admin foi aberta separadamente com adm@adm.com
          if (isAdminLoggedIn) {
            if (deniedWrapper) deniedWrapper.style.display = 'none';
            if (loginWrapper) loginWrapper.style.display = 'none';
            if (dashboardWrapper) dashboardWrapper.style.display = 'block';
            renderAdminDashboard();
            return;
          }

          // Se tem um usuário comum logado (diferente de adm@adm.com)
          if (currentUser && currentUser.email && currentUser.email.toLowerCase() !== ADMIN_EMAIL) {
            if (deniedWrapper) deniedWrapper.style.display = 'block';
            if (loginWrapper) loginWrapper.style.display = 'none';
            if (dashboardWrapper) dashboardWrapper.style.display = 'none';
            return;
          }

          // Nenhum usuário logado: exibe tela de login para adm@adm.com
          if (deniedWrapper) deniedWrapper.style.display = 'none';
          if (loginWrapper) loginWrapper.style.display = 'block';
          if (dashboardWrapper) dashboardWrapper.style.display = 'none';
        }

        adminBtn?.addEventListener('click', () => {
          window.location.hash = 'admin';
          $$('section[data-page]').forEach(p => p.classList.toggle('active-page', p.dataset.page === 'admin'));
          $$('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.nav === 'admin'));
          updateAdminView();
        });

        goAuthBtn?.addEventListener('click', () => {
          const authModal = $('#authModal');
          if (authModal) authModal.classList.add('open');
          const tabLog = $('#tabLoginBtn');
          if (tabLog) tabLog.click();
          const logEmail = $('#loginEmail');
          if (logEmail) logEmail.value = ADMIN_EMAIL;
        });

        // Formulário de Login ADM com restrição a adm@adm.com
        loginForm?.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = $('#admUserInput').value.trim().toLowerCase();
          const pass = $('#admPassInput').value.trim();

          if (email !== ADMIN_EMAIL) {
            alert('Acesso negado! Apenas Adiministrador tem permissão para visualizar o Painel ADM.');
            return;
          }

          if (pass === '12345') {
            isAdminLoggedIn = true;
            try { sessionStorage.setItem('ursic_admin_session', 'true'); } catch(err) {}
            
            // Sincroniza usuário logado se não houver um
            if (!currentUser || currentUser.email.toLowerCase() !== ADMIN_EMAIL) {
              const admFound = registeredUsers.find(u => u.email.toLowerCase() === ADMIN_EMAIL);
              currentUser = admFound || { id: 1, name: 'Administrador Ursic', email: 'adm@adm.com', phone: '(41) 99999-9999', style: 'Corte Clássico' };
              try { localStorage.setItem('ursic_current_user', JSON.stringify(currentUser)); } catch(err) {}
              const navName = $('#navUserName');
              if (navName) navName.innerText = 'Administrador';
              const userIcon = $('#userIconDisplay');
              if (userIcon) userIcon.innerText = '👑';
            }

            showToast('Painel ADM desbloqueado com sucesso!');
            loginForm.reset();
            updateAdminView();
          } else {
            alert('Login ou senha incorretos');
          }
        });

        // Logout ADM
        logoutBtn?.addEventListener('click', () => {
          isAdminLoggedIn = false;
          try { sessionStorage.removeItem('ursic_admin_session'); } catch(err) {}
          if (currentUser && currentUser.email && currentUser.email.toLowerCase() === ADMIN_EMAIL) {
            currentUser = null;
            try { localStorage.removeItem('ursic_current_user'); } catch(err) {}
            const navName = $('#navUserName');
            if (navName) navName.innerText = 'Entrar / Criar Conta';
            const userIcon = $('#userIconDisplay');
            if (userIcon) userIcon.innerText = '👤';
          }
          showToast('Sessão administrativa encerrada.');
          updateAdminView();
          window.location.hash = 'home';
          $$('section[data-page]').forEach(p => p.classList.toggle('active-page', p.dataset.page === 'home'));
          $$('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.nav === 'home'));
        });

        // Alternância: Fechar em Feriados
        if (holidayToggle) {
          holidayToggle.checked = adminSettings.closeOnHolidays;
          holidayToggle.addEventListener('change', () => {
            adminSettings.closeOnHolidays = holidayToggle.checked;
            saveAdminSettings();
            showToast(`Regra atualizada: Barbearia ${holidayToggle.checked ? 'FECHA' : 'ABRE'} em feriados.`);
            renderAdminDashboard();
            const dInput = $('#obDateInput');
            if (dInput) dInput.dispatchEvent(new Event('change'));
          });
        }

        // Adicionar dia em que a barbearia NÃO vai abrir
        addShopCloseForm?.addEventListener('submit', (e) => {
          e.preventDefault();
          const date = $('#admShopCloseDate').value;
          const reason = $('#admShopCloseReason').value.trim();

          if (adminSettings.closedDates.some(c => c.date === date)) {
            alert('Esta data já foi marcada como fechada.');
            return;
          }

          adminSettings.closedDates.push({ date, reason });
          saveAdminSettings();
          showToast(`Fechamento da barbearia salvo para o dia ${date.split('-').reverse().join('/')}!`);
          addShopCloseForm.reset();
          renderAdminDashboard();
          const dInput = $('#obDateInput');
          if (dInput) dInput.dispatchEvent(new Event('change'));
        });

        // Adicionar ausência de barbeiro
        addBarberAbsenceForm?.addEventListener('submit', (e) => {
          e.preventDefault();
          const barber = $('#admAbsenceBarberSelect').value;
          const date = $('#admAbsenceDate').value;
          const reason = $('#admAbsenceReason').value.trim();

          if (!barber || !date) return;

          adminSettings.barberAbsences.push({ barber, date, reason });
          saveAdminSettings();
          showToast(`Ausência registrada: ${barber} não irá no dia ${date.split('-').reverse().join('/')}.`);
          addBarberAbsenceForm.reset();
          renderAdminDashboard();
          const dInput = $('#obDateInput');
          if (dInput) dInput.dispatchEvent(new Event('change'));
        });

        // Delegação para remover dia fechado ou ausência
        document.addEventListener('click', (e) => {
          const remShopBtn = e.target.closest('.remove-shop-closed-btn');
          if (remShopBtn) {
            const date = remShopBtn.dataset.date;
            adminSettings.closedDates = adminSettings.closedDates.filter(c => c.date !== date);
            saveAdminSettings();
            showToast('Dia de fechamento removido. A barbearia voltará a aceitar agendamentos.');
            renderAdminDashboard();
            const dInput = $('#obDateInput');
            if (dInput) dInput.dispatchEvent(new Event('change'));
          }

          const remAbsenceBtn = e.target.closest('.remove-barber-absence-btn');
          if (remAbsenceBtn) {
            const idx = parseInt(remAbsenceBtn.dataset.index, 10);
            adminSettings.barberAbsences.splice(idx, 1);
            saveAdminSettings();
            showToast('Ausência de barbeiro removida.');
            renderAdminDashboard();
            const dInput = $('#obDateInput');
            if (dInput) dInput.dispatchEvent(new Event('change'));
          }

          // Ações ADM sobre agendamentos (Confirmar / Cancelar)
          const admStatusBtn = e.target.closest('.adm-change-status-btn');
          if (admStatusBtn) {
            const id = parseInt(admStatusBtn.dataset.id, 10);
            const newStatus = admStatusBtn.dataset.status;
            const target = savedAppointments.find(a => a.id === id);
            if (target) {
              target.status = newStatus;
              try { localStorage.setItem('ursic_appointments_db', JSON.stringify(savedAppointments)); } catch(err) {}
              showToast(`Status do agendamento alterado para: ${newStatus}`);
              renderAdminDashboard();
              const dInput = $('#obDateInput');
              if (dInput) dInput.dispatchEvent(new Event('change'));
            }
          }
        });

        // Filtro por data na tabela ADM
        filterDateInput?.addEventListener('change', () => {
          renderAdminDashboard(filterDateInput.value);
        });

        clearFilterBtn?.addEventListener('click', () => {
          if (filterDateInput) filterDateInput.value = '';
          renderAdminDashboard();
        });

        updateAdminView();
      } catch(e) {}
    }

    // Renderiza dados do painel ADM
    function renderAdminDashboard(filterDate = '') {
      try {
        const totalEl = $('#admStatTotal');
        const confirmedEl = $('#admStatConfirmed');
        const holidayStatEl = $('#admStatHolidays');
        const closedListEl = $('#admClosedShopList');
        const absenceListEl = $('#admBarbersAbsenceList');
        const tableBody = $('#admAppointmentsTableBody');

        if (totalEl) totalEl.innerText = savedAppointments.length;
        if (confirmedEl) confirmedEl.innerText = savedAppointments.filter(a => a.status === 'Confirmado').length;
        if (holidayStatEl) holidayStatEl.innerText = adminSettings.closeOnHolidays ? 'Fechado nos feriados' : 'Aberto nos feriados';

        // Renderiza lista de dias fechados
        if (closedListEl) {
          if (adminSettings.closedDates.length === 0) {
            closedListEl.innerHTML = `<span style="font-size:0.8rem; color:var(--text-muted);">Nenhum dia de fechamento geral cadastrado.</span>`;
          } else {
            closedListEl.innerHTML = adminSettings.closedDates.map(c => `
              <div class="date-tag">
                <span>📍 ${c.date.split('-').reverse().join('/')} (${c.reason})</span>
                <button class="remove-shop-closed-btn" data-date="${c.date}" title="Remover fechamento">✕</button>
              </div>
            `).join('');
          }
        }

        // Renderiza lista de ausências de barbeiros
        if (absenceListEl) {
          if (adminSettings.barberAbsences.length === 0) {
            absenceListEl.innerHTML = `<div style="color:var(--text-muted); padding:0.4rem;">Nenhuma ausência registrada. Toda a equipe ativa.</div>`;
          } else {
            absenceListEl.innerHTML = adminSettings.barberAbsences.map((ab, idx) => `
              <div style="display:flex; justify-content:space-between; align-items:center; padding:0.4rem 0; border-bottom:1px solid var(--surface-border);">
                <div>
                  <strong>${ab.barber}</strong> não vai no dia <strong>${ab.date.split('-').reverse().join('/')}</strong>
                  <div style="font-size:0.75rem; color:var(--text-muted);">Motivo: ${ab.reason}</div>
                </div>
                <button class="btn-danger-outline remove-barber-absence-btn" data-index="${idx}" style="font-size:0.7rem; padding:2px 6px;">Remover</button>
              </div>
            `).join('');
          }
        }

        // Renderiza Tabela de agendamentos
        if (tableBody) {
          let list = savedAppointments;
          if (filterDate) {
            list = list.filter(a => a.date === filterDate);
          }

          if (list.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">Nenhum agendamento encontrado para o filtro aplicado.</td></tr>`;
            return;
          }

          tableBody.innerHTML = list.map(a => `
            <tr>
              <td>
                <strong>${a.date.split('-').reverse().join('/')}</strong><br>
                <span style="color:var(--primary); font-weight:700;">${a.time}</span>
              </td>
              <td>
                <strong>${a.clientName}</strong>
                ${a.notes ? `<div style="font-size:0.75rem; color:var(--text-muted);">Obs: ${a.notes}</div>` : ''}
              </td>
              <td>${a.phone}</td>
              <td>${a.service}</td>
              <td>${a.barber}</td>
              <td>
                <span class="status-badge ${a.status === 'Cancelado' ? 'canceled' : ''}">${a.status}</span>
              </td>
              <td>
                <div style="display:flex; gap:0.4rem;">
                  ${a.status !== 'Confirmado' ? `
                    <button class="btn-primary adm-change-status-btn" data-id="${a.id}" data-status="Confirmado" style="padding:4px 8px; font-size:0.7rem;">Aprovar</button>
                  ` : ''}
                  ${a.status !== 'Cancelado' ? `
                    <button class="btn-danger-outline adm-change-status-btn" data-id="${a.id}" data-status="Cancelado" style="padding:4px 8px; font-size:0.7rem;">Cancelar</button>
                  ` : ''}
                </div>
              </td>
            </tr>
          `).reverse().join('');
        }
      } catch(e) {}
    }

    // 5. Hero Selector Interativo
    function initHeroSelector() {
      try {
        const chips = $$('#heroChips .chip');
        const title = $('#heroPreviewTitle');
        const desc = $('#heroPreviewDesc');
        const details = {
          corte: { title: 'Corte Degradê na Navalha', desc: 'Técnica apurada, visagismo e finalização premium.' },
          barba: { title: 'Barboterapia com Toalha Quente', desc: 'Vapor de ozônio, hidratação profunda e lâmina suave.' },
          combo: { title: 'Combo Signature (Corte + Barba)', desc: 'Alinhamento completo do visual com economia e conforto.' },
          evento: { title: 'Pacote Noivo & Confraria', desc: 'Atendimento exclusivo para momentos especiais e fotos marcantes.' }
        };

        chips.forEach(chip => {
          chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const data = details[chip.dataset.role];
            if (data && title && desc) {
              title.innerText = data.title;
              desc.innerText = data.desc;
            }
          });
        });
      } catch(e) {}
    }

    // 6. Mini Quiz de Recomendação
    function initQuiz() {
      try {
        const steps = $$('.quiz-step');
        let answers = [];
        
        $$('.quiz-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            answers.push(btn.getAttribute('data-answer'));
            const currentStep = btn.closest('.quiz-step');
            const stepNum = parseInt(currentStep.dataset.step, 10);
            
            currentStep.classList.remove('active');
            if (stepNum < 3) {
              const nextStep = $(`.quiz-step[data-step="${stepNum + 1}"]`);
              if (nextStep) nextStep.classList.add('active');
            } else {
              const resultStep = $(`.quiz-step[data-step="result"]`);
              if (resultStep) resultStep.classList.add('active');
            }
          });
        });

        const resetBtn = $('#quizReset');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            answers = [];
            steps.forEach(s => s.classList.remove('active'));
            const step1 = $('.quiz-step[data-step="1"]');
            if (step1) step1.classList.add('active');
          });
        }

        const sendBtn = $('#quizSendBooking');
        if (sendBtn) {
          sendBtn.addEventListener('click', () => {
            window.location.hash = 'agendamento';
            $$('section[data-page]').forEach(p => p.classList.toggle('active-page', p.dataset.page === 'agendamento'));
            const sel = $('#obServiceSelect');
            if (sel) sel.value = 'Combo Completo (Cabelo + Barba)';
            showToast('Recomendação selecionada no formulário de agendamento!');
          });
        }
      } catch(e) {}
    }

    // 7. Calculadora de Pacotes em Tempo Real
    function initCalculator() {
      try {
        const container = $('#calcChecklist');
        const totalEl = $('#calcTotalValue');
        const countEl = $('#calcSelectedCount');
        const bookBtn = $('#calcBookBtn');

        function updateCalc() {
          const checked = $$('#calcChecklist input:checked');
          let sum = 0;
          let names = [];
          checked.forEach(inp => {
            sum += parseFloat(inp.value);
            names.push(inp.dataset.name);
            inp.closest('.calc-item').classList.add('checked');
          });
          $$('#calcChecklist input:not(:checked)').forEach(inp => {
            inp.closest('.calc-item').classList.remove('checked');
          });

          if (totalEl) totalEl.innerText = `R$ ${sum.toFixed(2).replace('.', ',')}`;
          if (countEl) countEl.innerText = `${checked.length} serviços selecionados`;

          return { sum, names };
        }

        if (container) {
          container.addEventListener('change', updateCalc);
          updateCalc();
        }

        if (bookBtn) {
          bookBtn.addEventListener('click', () => {
            window.location.hash = 'agendamento';
            $$('section[data-page]').forEach(p => p.classList.toggle('active-page', p.dataset.page === 'agendamento'));
            showToast('Selecione seu barbeiro e data para finalizar a reserva!');
          });
        }
      } catch(e) {}
    }

    // 8. Comparador Antes/Depois
    function initCompareSlider() {
      try {
        const wrapper = $('#compareSlider');
        const overlay = $('#compareOverlay');
        const handle = $('#compareHandle');
        if (!wrapper || !overlay || !handle) return;

        let active = false;
        function slide(x) {
          const rect = wrapper.getBoundingClientRect();
          let pos = ((x - rect.left) / rect.width) * 100;
          if (pos < 5) pos = 5;
          if (pos > 95) pos = 95;
          overlay.style.width = pos + '%';
          handle.style.left = pos + '%';
        }

        wrapper.addEventListener('mousedown', () => active = true);
        window.addEventListener('mouseup', () => active = false);
        window.addEventListener('mousemove', e => { if (active) slide(e.clientX); });

        wrapper.addEventListener('touchstart', () => active = true);
        window.addEventListener('touchend', () => active = false);
        window.addEventListener('touchmove', e => { if (active && e.touches[0]) slide(e.touches[0].clientX); });
      } catch(e) {}
    }

    // 9. Flip Cards
    function initFlipCards() {
      try {
        $$('.flip-card').forEach(card => {
          card.addEventListener('click', () => {
            card.classList.toggle('flipped');
          });
        });
      } catch(e) {}
    }

    // 10. Timeline de Etapas
    function initTimeline() {
      try {
        const tabs = $$('#timelineTabs .timeline-tab');
        const stepNum = $('#tlStepNumber');
        const stepTitle = $('#tlStepTitle');
        const stepText = $('#tlStepText');
        const stepImg = $('#tlStepImg');

        const timelineData = {
          '1': {
            num: 'ETAPA 01',
            title: 'Diagnóstico & Alinhamento de Expectativas',
            text: 'Antes de tocar nos fios, conversamos sobre seu gosto e estilo. Analisamos o formato do rosto e caimento do cabelo para um corte feito para você.',
            img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=500&q=80'
          },
          '2': {
            num: 'ETAPA 02',
            title: 'Execução Técnica & Fade Cirúrgico',
            text: 'Corte minucioso usando técnicas de tesoura sobre pente e transições perfeitas no degradê, sem marcas e com alinhamento das costeiras.',
            img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=80'
          },
          '3': {
            num: 'ETAPA 03',
            title: 'Ritual de Barboterapia & Toalha Quente',
            text: 'Aplicação de óleo essencial protetor, toalhas aquecidas com vapor de ozônio para amaciar a barba e navalha descartada na sua presença.',
            img: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=500&q=80'
          },
          '4': {
            num: 'ETAPA 04',
            title: 'Finalização & Consultoria de Manutenção',
            text: 'Aplicação de tônico refrescante, pomada de acabamento e recomendações precisas dos produtos corretos para você manter o estilo em casa.',
            img: 'https://images.unsplash.com/photo-1517832606589-7629c3397143?auto=format&fit=crop&w=500&q=80'
          }
        };

        tabs.forEach(tab => {
          tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const data = timelineData[tab.dataset.step];
            if (data && stepNum && stepTitle && stepText && stepImg) {
              stepNum.innerText = data.num;
              stepTitle.innerText = data.title;
              stepText.innerText = data.text;
              stepImg.src = data.img;
            }
          });
        });
      } catch(e) {}
    }

    // 11. FAQ com Busca em Tempo Real
    function initFaq() {
      try {
        const input = $('#faqSearchInput');
        const items = $$('#faqAccordion .faq-item');

        if (input) {
          input.addEventListener('input', () => {
            const q = input.value.toLowerCase().trim();
            items.forEach(item => {
              const text = (item.dataset.keywords + ' ' + item.innerText).toLowerCase();
              item.style.display = text.includes(q) ? 'block' : 'none';
            });
          });
        }

        items.forEach(item => {
          const trigger = item.querySelector('.faq-q');
          if (trigger) {
            trigger.addEventListener('click', () => {
              const isOpen = item.classList.contains('open');
              items.forEach(i => i.classList.remove('open'));
              if (!isOpen) item.classList.add('open');
            });
          }
        });
      } catch(e) {}
    }

    // 12. Loja, Produtos e Carrinho
    function initStoreAndCart() {
      try {
        const prodGrid = $('#productsGrid');
        const servGrid = $('#servicesGrid');
        const filterBtns = $$('#productFilterButtons .chip');

        if (servGrid) {
          servGrid.innerHTML = SERVICES_DATA.map(s => `
            <div class="item-card">
              <div class="item-body">
                <span style="font-size:0.75rem; color:var(--primary); font-weight:700;">⏱️ ${s.time}</span>
                <div class="item-title" style="margin-top:0.4rem;">${s.name}</div>
                <div class="item-desc">${s.desc}</div>
                <div class="item-foot">
                  <div class="item-price">R$ ${s.price.toFixed(2).replace('.', ',')}</div>
                  <button class="btn-primary service-book-btn" data-service-name="${s.name}" data-nav="agendamento">Agendar Online</button>
                </div>
              </div>
            </div>
          `).join('');
        }

        document.addEventListener('click', (e) => {
          const btn = e.target.closest('.service-book-btn');
          if (btn) {
            const sName = btn.dataset.serviceName;
            const sel = $('#obServiceSelect');
            if (sel) sel.value = sName;
          }
        });

        function renderProducts(cat = 'all') {
          if (!prodGrid) return;
          const filtered = cat === 'all' ? PRODUCTS_DATA : PRODUCTS_DATA.filter(p => p.cat === cat);
          prodGrid.innerHTML = filtered.map(p => `
            <div class="item-card">
              <img class="item-img" src="${p.img}" alt="${p.name}">
              <div class="item-body">
                <div class="item-title">${p.name}</div>
                <div class="item-desc">${p.desc}</div>
                <div class="item-foot">
                  <div class="item-price">R$ ${p.price.toFixed(2).replace('.', ',')}</div>
                  <button class="btn-primary add-to-cart-btn" data-product-id="${p.id}">+ Carrinho</button>
                </div>
              </div>
            </div>
          `).join('');
        }
        renderProducts('all');

        filterBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.cat);
          });
        });

        const badge = $('#cartBadge');
        const subtotalEl = $('#cartSubtotal');
        const cartList = $('#cartItemsList');
        const overlay = $('#cartOverlay');
        const drawer = $('#cartDrawer');

        function saveCart() {
          try { localStorage.setItem('ursic_cart', JSON.stringify(cart)); } catch(e) {}
          updateCartUI();
        }

        function updateCartUI() {
          const totalQty = cart.reduce((acc, it) => acc + it.qty, 0);
          if (badge) badge.innerText = totalQty;

          const sum = cart.reduce((acc, it) => acc + (it.price * it.qty), 0);
          if (subtotalEl) subtotalEl.innerText = `R$ ${sum.toFixed(2).replace('.', ',')}`;

          if (!cartList) return;
          if (cart.length === 0) {
            cartList.innerHTML = `<div style="text-align:center; color:var(--text-muted); margin-top:3rem;">Seu carrinho está vazio. Adicione produtos na loja.</div>`;
            return;
          }

          cartList.innerHTML = cart.map(item => `
            <div class="cart-item">
              <img src="${item.img}" style="width:48px; height:48px; border-radius:8px; object-fit:cover;" alt="${item.name}">
              <div class="cart-item-info">
                <div style="font-weight:700; font-size:0.85rem;">${item.name}</div>
                <div style="font-size:0.8rem; color:var(--primary);">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</div>
                <div class="cart-qty-ctrl">
                  <button class="cart-qty-btn cart-qty-minus" data-id="${item.id}">-</button>
                  <span style="font-size:0.85rem; font-weight:700;">${item.qty}</span>
                  <button class="cart-qty-btn cart-qty-plus" data-id="${item.id}">+</button>
                  <button class="cart-qty-btn cart-remove-item" data-id="${item.id}" style="color:#ef4444; margin-left:auto;">🗑</button>
                </div>
              </div>
            </div>
          `).join('');
        }
        updateCartUI();

        document.addEventListener('click', (e) => {
          const addBtn = e.target.closest('.add-to-cart-btn');
          if (addBtn) {
            const pId = parseInt(addBtn.dataset.productId, 10);
            const product = PRODUCTS_DATA.find(p => p.id === pId);
            if (product) {
              const existing = cart.find(i => i.id === pId);
              if (existing) existing.qty += 1;
              else cart.push({ ...product, qty: 1 });
              saveCart();
              showToast(`${product.name} adicionado ao carrinho!`);
            }
          }

          const plusBtn = e.target.closest('.cart-qty-plus');
          if (plusBtn) {
            const id = parseInt(plusBtn.dataset.id, 10);
            const it = cart.find(i => i.id === id);
            if (it) { it.qty += 1; saveCart(); }
          }

          const minusBtn = e.target.closest('.cart-qty-minus');
          if (minusBtn) {
            const id = parseInt(minusBtn.dataset.id, 10);
            const it = cart.find(i => i.id === id);
            if (it) {
              it.qty -= 1;
              if (it.qty <= 0) cart = cart.filter(i => i.id !== id);
              saveCart();
            }
          }

          const remBtn = e.target.closest('.cart-remove-item');
          if (remBtn) {
            const id = parseInt(remBtn.dataset.id, 10);
            cart = cart.filter(i => i.id !== id);
            saveCart();
          }
        });

        const openCart = () => { overlay.classList.add('open'); drawer.classList.add('open'); };
        const closeCart = () => { overlay.classList.remove('open'); drawer.classList.remove('open'); };
        
        $('#cartOpenBtn')?.addEventListener('click', openCart);
        $('#cartCloseBtn')?.addEventListener('click', closeCart);
        overlay?.addEventListener('click', closeCart);

        $('#cartCheckoutForm')?.addEventListener('submit', (e) => {
          e.preventDefault();
          if (cart.length === 0) {
            alert('Adicione ao menos um item ao carrinho.');
            return;
          }
          const name = $('#orderClientName').value;
          const sum = cart.reduce((acc, it) => acc + (it.price * it.qty), 0);

          showToast(`Pedido de R$ ${sum.toFixed(2)} registrado com sucesso para ${name}!`);
          cart = [];
          saveCart();
          closeCart();
        });

      } catch(e) {}
    }

    // 13. Tema Claro / Escuro
    function initTheme() {
      try {
        const themeBtn = $('#themeToggle');
        const body = document.body;

        try {
          const savedTheme = localStorage.getItem('ursic_theme');
          if (savedTheme) body.setAttribute('data-theme', savedTheme);
        } catch(e) {}

        themeBtn?.addEventListener('click', () => {
          const current = body.getAttribute('data-theme');
          const next = current === 'dark' ? 'light' : 'dark';
          body.setAttribute('data-theme', next);
          try { localStorage.setItem('ursic_theme', next); } catch(e) {}
        });
      } catch(e) {}
    }

    // Inicialização
    document.addEventListener('DOMContentLoaded', () => {
      initNavigation();
      initUserSystem();
      initOnlineBookingSystem();
      initAdminSystem();
      initHeroSelector();
      initQuiz();
      initCalculator();
      initCompareSlider();
      initFlipCards();
      initTimeline();
      initFaq();
      initStoreAndCart();
      initTheme();
      updateAdminAccessVisibility();
    });
  