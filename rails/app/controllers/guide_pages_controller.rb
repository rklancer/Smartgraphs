class GuidePagesController < ApplicationController
  # GET /guide_pages
  # GET /guide_pages.xml
  def index
    puts "GuidePagesController.index called"
    @guide_pages = GuidePage.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @guide_pages }
      format.json { 
        guide_pages = @guide_pages.map {|guide_page| sproutcore_json(guide_page)["guide_page"] }
        render :json => { :content => guide_pages } 
      }
    end
  end

  # GET /guide_pages/1
  # GET /guide_pages/1.xml
  def show
    puts "GuidePagesController.show called"
    @guide_page = GuidePage.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @guide_page }
      format.json do
        render :json => {
          :content => sproutcore_json(@guide_page)["guide_page"],
          :location => guide_page_path(@guide_page)
        }
      end
    end
  end

  # GET /guide_pages/new
  # GET /guide_pages/new.xml
  def new
    @guide_page = GuidePage.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @guide_page }
    end
  end

  # GET /guide_pages/1/edit
  def edit
    @guide_page = GuidePage.find(params[:id])
  end

  # POST /guide_pages
  # POST /guide_pages.xml
  def create
    @guide_page = GuidePage.new(params[:guide_page])

    respond_to do |format|
      if @guide_page.save
        format.html { redirect_to(@guide_page, :notice => 'GuidePage was successfully created.') }
        format.xml  { render :xml => @guide_page, :status => :created, :location => @guide_page }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @guide_page.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /guide_pages/1
  # PUT /guide_pages/1.xml
  def update
    @guide_page = GuidePage.find(params[:id])

    respond_to do |format|
      if @guide_page.update_attributes(params[:guide_page])
        format.html { redirect_to(@guide_page, :notice => 'GuidePage was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @guide_page.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /guide_pages/1
  # DELETE /guide_pages/1.xml
  def destroy
    @guide_page = GuidePage.find(params[:id])
    @guide_page.destroy

    respond_to do |format|
      format.html { redirect_to(guide_pages_url) }
      format.xml  { head :ok }
    end
  end
end
